import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentReport, StudentReportService } from './student-report.service';

@Component({
  imports: [CommonModule, DecimalPipe, RouterLink],
  selector: 'app-student-detail-page',
  styleUrl: './student-detail.page.css',
  templateUrl: './student-detail.page.html',
})
export class StudentDetailPage implements OnInit {
  report = signal<StudentReport | undefined>(undefined);
  loading = signal(true);
  error = signal(false);

  constructor(
    private route: ActivatedRoute,
    private reportService: StudentReportService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reportService.getReports().subscribe({
      next: (reports) => {
        this.report.set(reports.find((student) => student.id === id));
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}