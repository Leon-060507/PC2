import { Routes } from '@angular/router';
import { EstudPage } from './estud';

export const routes: Routes = [
	{ path: '', component: EstudPage, title: 'Reporte de estudiantes' },
	{ path: 'estudiantes/:id', component: EstudPage, title: 'Detalle del estudiante' },
	{ path: '**', redirectTo: '' },
];
