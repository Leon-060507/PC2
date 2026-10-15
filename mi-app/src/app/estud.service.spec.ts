import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EstudReporte, EstudReporteService } from './estud.service';

describe('EstudReporteService', () => {
  let service: EstudReporteService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EstudReporteService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('calculates sums, averages, academic status, and observations at the cutoffs', () => {
    let reports: EstudReporte[] = [];

    service.getReports().subscribe((result) => (reports = result));

    httpController.expectOne('https://careli2021.github.io/api_examen/api/estudiante.json').flush([
      { id: 1, nombre: 'Aprobado', nota1: 12, nota2: 13, nota3: 14 },
      { id: 2, nombre: 'Excelente', nota1: 16, nota2: 17, nota3: 18 },
      { id: 3, nombre: 'En riesgo', nota1: 12, nota2: 12, nota3: 14 },
      { id: 4, nombre: 'Regular sin aprobar', nota1: 12, nota2: 12, nota3: 14.5 },
      { id: 5, nombre: 'Límite de riesgo', nota1: 12, nota2: 12, nota3: 12 },
    ]);

    expect(reports[0]).toMatchObject({ suma: 39, promedio: 13, estado: 'Aprobado', observacion: 'Regular' });
    expect(reports[1]).toMatchObject({ suma: 51, promedio: 17, estado: 'Aprobado', observacion: 'Excelente' });
    expect(reports[2]).toMatchObject({ suma: 38, promedio: 38 / 3, estado: 'Desaprobado', observacion: 'Regular' });
    expect(reports[3]).toMatchObject({ suma: 38.5, promedio: 38.5 / 3, estado: 'Desaprobado', observacion: 'Regular' });
    expect(reports[4]).toMatchObject({ suma: 36, promedio: 12, estado: 'Desaprobado', observacion: 'En riesgo' });
  });
});