import { Routes } from '@angular/router';
import { StudentDetailPage } from './student-detail.page';
import { StudentListPage } from './student-list.page';

export const routes: Routes = [
	{ path: '', component: StudentListPage, title: 'Reporte de estudiantes' },
	{ path: 'estudiantes/:id', component: StudentDetailPage, title: 'Detalle del estudiante' },
	{ path: '**', redirectTo: '' },
];
