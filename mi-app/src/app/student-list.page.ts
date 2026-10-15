import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentReport, StudentReportService } from './student-report.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-student-list-page',
  styleUrl: './student-list.page.css',
  templateUrl: './student-list.page.html',
})
export class StudentListPage implements OnInit {
  reports = signal<StudentReport[]>([]);
  loading = signal(true);
  error = signal(false);

  constructor(private reportService: StudentReportService) {}

  ngOnInit(): void {
    this.reportService.getReports().subscribe({
      next: (reports) => {
        this.reports.set(reports);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}