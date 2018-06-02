import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DaysOfSprintServiceService } from './services/days-of-sprint-chart/days-of-sprint-service.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { IDaysOfSprintChartModel } from './models/days-of-sprint-chart/days-of-sprint-chart.model';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [DaysOfSprintServiceService]
})
export class DashboardComponent implements OnInit, AfterViewInit {
	
	public daysOfSprintChartModel: IDaysOfSprintChartModel;

	constructor(private daysOfSprintService: DaysOfSprintServiceService) {}

	startAnimationForLineChart(chart) {
		let seq: any, delays: any, durations: any;
		seq = 0;
		delays = 80;
		durations = 500;

		chart.on('draw', function(data) {
			if (data.type === 'line' || data.type === 'area') {
				data.element.animate({
					d: {
						begin: 600,
						dur: 700,
						from: data.path
							.clone()
							.scale(1, 0)
							.translate(0, data.chartRect.height())
							.stringify(),
						to: data.path.clone().stringify(),
						easing: Chartist.Svg.Easing.easeOutQuint
					}
				});
			} else if (data.type === 'point') {
				seq++;
				data.element.animate({
					opacity: {
						begin: seq * delays,
						dur: durations,
						from: 0,
						to: 1,
						easing: 'ease'
					}
				});
			}
		});

		seq = 0;
	}
	startAnimationForBarChart(chart) {
		let seq2: any, delays2: any, durations2: any;

		seq2 = 0;
		delays2 = 80;
		durations2 = 500;
		chart.on('draw', function(data) {
			if (data.type === 'bar') {
				seq2++;
				data.element.animate({
					opacity: {
						begin: seq2 * delays2,
						dur: durations2,
						from: 0,
						to: 1,
						easing: 'ease'
					}
				});
			}
		});

		seq2 = 0;
	}

	ngOnInit() {
		this.daysOfSprintChartModel = {
			daysOfSprintChartId: 'daysOfSprintChart',
			daysOfSprintChartUpdatedTime: new Date()
		};

		/* ----------==========     Completed Tasks Chart initialization    ==========---------- */

		const dataCompletedTasksChart: any = {
			labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
			series: [[230, 750, 450, 300, 280, 240, 200, 190]]
		};

		const optionsCompletedTasksChart: any = {
			lineSmooth: Chartist.Interpolation.cardinal({
				tension: 0
			}),
			low: 0,
			high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
			chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
		};

		var completedTasksChart = new Chartist.Line(
			'#completedTasksChart',
			dataCompletedTasksChart,
			optionsCompletedTasksChart
		);

		// start animation for the Completed Tasks Chart - Line Chart
		this.startAnimationForLineChart(completedTasksChart);
	}

	ngAfterViewInit(): void {
		this.renderInitialDaysOfSprintChart();
	}

	private renderInitialDaysOfSprintChart() {
		let currentDayOfSprintIndex = this.daysOfSprintService.Initialize();

		const dataDaysOfSprintChart: any = {
			labels: [
				'T',
				'W',
				'T',
				'F',
				'S',
				'S',
				'M',
				'T',
				'W',
				'T',
				'F',
				'S',
				'S',
				'M'
			],
			series: [[0, 40, 37, 35, 33, 30, 27, 25, 23, 20, 15, 13, 10, 5]]
		};

		dataDaysOfSprintChart.series[0].splice(
			currentDayOfSprintIndex - 1,
			dataDaysOfSprintChart.series[0].length - currentDayOfSprintIndex
		);

		const optionsDaysOfSprintChart: any = {
			lineSmooth: Chartist.Interpolation.cardinal({
				tension: 0
			}),
			low: 0,
			high: 50,
			chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
		};
		var daysOfSprintChart = new Chartist.Line(
			'#' + this.daysOfSprintChartModel.daysOfSprintChartId,
			dataDaysOfSprintChart,
			optionsDaysOfSprintChart
		);

		this.startAnimationForLineChart(daysOfSprintChart);
	}
}
