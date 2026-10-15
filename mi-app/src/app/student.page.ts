import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentReport, StudentReportService } from './student-report.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-student-page',
  styleUrl: './student.page.css',
  templateUrl: './student.page.html',
})
export class StudentPage implements OnInit {
  students: StudentReport[] = [];
  student?: StudentReport;
  loading = true;
  error = '';
  studentNotFound = false;

  constructor(
    private service: StudentReportService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.service.getReports().subscribe({
      next: (reports) => {
        this.students = reports;
        const id = this.route.snapshot.paramMap.get('id');
        this.student = id ? reports.find((item) => item.id === Number(id)) : undefined;
        this.studentNotFound = Boolean(id) && !this.student;
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