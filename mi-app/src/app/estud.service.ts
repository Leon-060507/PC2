import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Estud {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

export interface EstudReporte extends Estud {
  suma: number;
  promedio: number;
  estado: 'Aprobado' | 'Desaprobado';
  observacion: 'Excelente' | 'Regular' | 'En riesgo';
}

@Injectable({ providedIn: 'root' })
export class EstudReporteService {
  constructor(private http: HttpClient) {}

  getReports(): Observable<EstudReporte[]> {
    return this.http.get<Estud[]>('https://careli2021.github.io/api_examen/api/estudiante.json').pipe(
      map((estudiantes) => estudiantes.map((estud) => {
        const sumanot = estud.nota1 + estud.nota2 + estud.nota3;
        const prom = sumanot / 3;
        const estacad = prom >= 13 ? 'Aprobado' : 'Desaprobado';
        const observacion = prom >= 17 ? 'Excelente' : prom > 12 && prom < 17 ? 'Regular' : 'En riesgo';

        return {
          ...estud,
          suma: sumanot,
          promedio: prom,
          estado: estacad,
          observacion,
        };
      })),
    );
  }
}