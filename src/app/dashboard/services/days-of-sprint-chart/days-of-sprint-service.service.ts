import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DaysOfSprintServiceService {
	constructor() {}

	public Initialize(): any {
		let todaysDate = moment();

		let dayOfSprint = this.computeDayOfCurrentSprint(todaysDate);

		return dayOfSprint;
	}

	private computeDayOfCurrentSprint(todaysDate: moment.Moment): number {
		let referenceDateForSprintStart = moment('2018-05-09', 'YYYY-MM-DD');
		let referenceDateForSprintEnd = moment('2018-05-22', 'YYYY-MM-DD');
		let sprintSpan = this.computeSprintSpan(
			referenceDateForSprintStart,
			referenceDateForSprintEnd
		);

		let differenceOfDays = Math.ceil(
			moment.duration(todaysDate.diff(referenceDateForSprintEnd)).asDays()
		);

		let currentDayOfSprint;
		if (differenceOfDays <= sprintSpan) {
			currentDayOfSprint = differenceOfDays;
		} else {
			currentDayOfSprint = differenceOfDays % sprintSpan;
		}

		return currentDayOfSprint;
	}

	private computeSprintSpan(
		referenceDateForSprintStart,
		referenceDateForSprintEnd
	): number {
		let sprintSpan = moment
			.duration(referenceDateForSprintEnd.diff(referenceDateForSprintStart))
			.asDays();
		return sprintSpan;
	}
}
