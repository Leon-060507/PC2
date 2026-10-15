import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Student {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

export interface StudentReport extends Student {
  suma: number;
  promedio: number;
  estado: 'Aprobado' | 'Desaprobado';
  observacion: 'Excelente' | 'Regular' | 'En riesgo';
}

@Injectable({ providedIn: 'root' })
export class StudentReportService {
  constructor(private http: HttpClient) {}

  getReports(): Observable<StudentReport[]> {
    return this.http.get<Student[]>('https://careli2021.github.io/api_examen/api/estudiante.json').pipe(
      map((students) => students.map((student) => {
        const sumanot = student.nota1 + student.nota2 + student.nota3;
        const prom = sumanot / 3;
        const estacad = prom >= 13 ? 'Aprobado' : 'Desaprobado';
        const observacion = prom >= 17 ? 'Excelente' : prom > 12 && prom < 17 ? 'Regular' : 'En riesgo';

        return {
          ...student,
          suma: sumanot,
          promedio: prom,
          estado: estacad,
          observacion,
        };
      })),
    );
  }
}