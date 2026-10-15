import { Routes } from '@angular/router';
import { StudentPage } from './student.page';

export const routes: Routes = [
	{ path: '', component: StudentPage, title: 'Reporte de estudiantes' },
	{ path: 'estudiantes/:id', component: StudentPage, title: 'Detalle del estudiante' },
	{ path: '**', redirectTo: '' },
];
