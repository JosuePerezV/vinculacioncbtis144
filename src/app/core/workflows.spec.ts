import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { navigation } from './navigation';
import { PracticesStore } from './practices-store';
import { DocumentsStore, blankDocument } from './documents-store';
import { PanelProfile } from './session';
import { relativeDate } from './calendar';

describe('Rutas y primer ingreso', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));
  it('requires valid credentials and blocks the panel after logout', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/vinculacion/practicas');
    expect(TestBed.inject(Router).url).toBe('/login');
    const session = TestBed.inject(PanelProfile);
    expect(session.login('incorrecto@example.test', 'incorrecta')).toBe(false);
    expect(session.login('vinculacion@cbtis144.local', 'Cbtis144!2026')).toBe(true);
    await harness.navigateByUrl('/vinculacion');
    expect(TestBed.inject(Router).url).toBe('/vinculacion/resumen');
    session.updateProfile({ name: 'Nuevo nombre', email: 'nuevo@example.test', phone: '123' });
    expect(session.profile().name).toBe('Nuevo nombre');
    session.logout();
    await harness.navigateByUrl('/vinculacion/documentos');
    expect(TestBed.inject(Router).url).toBe('/login');
    expect(session.login('nuevo@example.test', 'Cbtis144!2026')).toBe(true);
  });
  it('connects every menu destination and renders an unknown-route page', async () => {
    TestBed.inject(PanelProfile).login('vinculacion@cbtis144.local', 'Cbtis144!2026');
    const harness = await RouterTestingHarness.create();
    for (const link of navigation) {
      await harness.navigateByUrl(`/vinculacion/${link.path}`);
      expect(TestBed.inject(Router).url).toBe(`/vinculacion/${link.path}`);
      expect(
        harness.routeNativeElement?.querySelector('main')?.textContent?.trim().length,
      ).toBeGreaterThan(20);
    }
    await harness.navigateByUrl('/ruta-inexistente');
    expect(harness.routeNativeElement?.textContent).toContain('Esta dirección no existe');
  });
});

describe('Entregas y revisión de prácticas', () => {
  it('keeps each upload pending review and preserves earlier deliveries and observations', () => {
    const store = new PracticesStore(),
      id = store.records()[0].id,
      rid = '1';
    const file1 = new File(['%PDF-1.7'], 'primera.pdf', { type: 'application/pdf' });
    expect(store.review(id, rid, 'Aprobado', '')).toBe(false);
    expect(store.deliver(id, rid, file1)).toBe(true);
    expect(store.records()[0].requirements[0].status).toBe('Entregado');
    expect(store.review(id, rid, 'Requiere corrección', '')).toBe(false);
    expect(store.review(id, rid, 'Requiere corrección', 'Falta una página')).toBe(true);
    expect(store.deliver(id, rid, new File(['%PDF-1.7'], 'corregida.pdf'))).toBe(true);
    expect(store.records()[0].requirements[0].deliveries).toHaveLength(2);
    expect(
      store.records()[0].requirements[0].history.some((e) => e.text.includes('Falta una página')),
    ).toBe(true);
    expect(store.review(id, rid, 'Aprobado', 'Revisión de muestra completa')).toBe(true);
  });
  it('blocks closed delivery windows until an individually justified exception is set', () => {
    const store = new PracticesStore(),
      id = store.records()[0].id;
    expect(store.calendar(id, '1', relativeDate(-10), relativeDate(-2), '', '')).toBe(true);
    expect(store.deliver(id, '1', new File(['%PDF-'], 'prueba.pdf'))).toBe(false);
    expect(store.calendar(id, '1', relativeDate(-10), relativeDate(-2), relativeDate(2), '')).toBe(
      false,
    );
    expect(
      store.calendar(
        id,
        '1',
        relativeDate(-10),
        relativeDate(-2),
        relativeDate(2),
        'Excepción de prueba',
      ),
    ).toBe(true);
    expect(store.deliver(id, '1', new File(['%PDF-'], 'prueba.pdf'))).toBe(true);
    expect(store.records()[1].requirements[0].exception).toBeUndefined();
  });
});

describe('Borradores documentales', () => {
  it('keeps distinct versions when a saved document is edited', () => {
    const store = new DocumentsStore();
    const original = store.save({
      ...blankDocument('circular'),
      subject: 'Primera redacción',
      body: 'Contenido inicial',
    });
    store.save({ ...original, subject: 'Asunto corregido', body: 'Contenido revisado' });
    expect(store.records()).toHaveLength(1);
    expect(store.records()[0].revisions).toHaveLength(2);
    expect(store.records()[0].revisions[0].draft.body).toBe('Contenido inicial');
    expect(store.records()[0].body).toBe('Contenido revisado');
    expect(store.records()[0].revisions[1].draft).not.toHaveProperty('revisions');
  });
});
