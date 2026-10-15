import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StudentReport, StudentReportService } from './student-report.service';

describe('StudentReportService', () => {
  let service: StudentReportService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(StudentReportService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('calculates sums, averages, academic status, and observations at the cutoffs', () => {
    let reports: StudentReport[] = [];

    service.getReports().subscribe((result) => (reports = result));

    httpController.expectOne('https://careli2021.github.io/api_examen/api/estudiante.json').flush([
      { id: 1, nombre: 'Aprobado', nota1: 12, nota2: 13, nota3: 14 },
      { id: 2, nombre: 'Excelente', nota1: 16, nota2: 17, nota3: 18 },
      { id: 3, nombre: 'En riesgo', nota1: 12, nota2: 12, nota3: 14 },
    ]);

    expect(reports[0]).toMatchObject({ suma: 39, promedio: 13, estado: 'Aprobado', observacion: 'Regular' });
    expect(reports[1]).toMatchObject({ suma: 51, promedio: 17, estado: 'Aprobado', observacion: 'Excelente' });
    expect(reports[2]).toMatchObject({ suma: 38, promedio: 12.67, estado: 'Desaprobado', observacion: 'En riesgo' });
  });
});