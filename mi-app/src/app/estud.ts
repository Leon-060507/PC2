import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EstudReporte, EstudReporteService } from './estud.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-estud-page',
  styleUrl: './estud.css',
  templateUrl: './estud.html',
})
export class EstudPage implements OnInit {
  estudiantes: EstudReporte[] = [];
  estud?: EstudReporte;
  loading = true;
  error = '';
  estudNoEncontrado = false;

  constructor(
    private service: EstudReporteService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.service.getReports().subscribe({
      next: (reports) => {
        this.estudiantes = reports;
        const id = this.route.snapshot.paramMap.get('id');
        this.estud = id ? reports.find((item) => item.id === Number(id)) : undefined;
        this.estudNoEncontrado = Boolean(id) && !this.estud;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener estudiantes:', error);
        this.error = 'No se pudieron obtener los estudiantes.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}