import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { WScheduleService } from 'src/app/services/workschedule.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ChannelService } from 'src/app/services/channel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface WorkHour {
	EmployeeID?: number;
	fullname: string;
	ChannelName: string;
	TOTALWORKINGHOURS: number;
}




@Component({
  selector: 'app-workhours',
  templateUrl: './workhours.component.html',
  styleUrl: './workhours.component.scss',
  styles: `
		.dp-hidden {
			width: 0;
			margin: 0;
			border: none;
			padding: 0;
		}
		.custom-day {
			text-align: center;
			padding: 0.185rem 0.25rem;
			display: inline-block;
			height: 2rem;
			width: 2rem;
		}
		.custom-day.focused {
			background-color: #e6e6e6;
		}
		.custom-day.range,
		.custom-day:hover {
			background-color: rgb(2, 117, 216);
			color: white;
		}
		.custom-day.faded {
			background-color: rgba(2, 117, 216, 0.5);
		}
	`
})

export class WorkhoursComponent implements OnInit {

	
	workhours: WorkHour[] = [];
	workhour: WorkHour [] = [];
	agents!: any [];
	channels!: any[];
	startDate = '2024-02-01';
	endDate = '2024-04-01'
	
	// pagination 
	page = 1;
	pageSize = 2;
	collectionSize = 0;

	//filter
	filterForm !: FormGroup;

	constructor(	
		private wschedule: WScheduleService,
		private empService : EmployeeService,
		private channelService : ChannelService,
		private _fb: FormBuilder,
	){
		// this.refreshWorkHour();
		this.filterForm = this._fb.group({
			EmployeeID: ['', Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			ChannelID: ['', Validators.required]
		})
	}

	ngOnInit(): void {
		// this.getTotalWorkHour();
		this.getAllAgent();
		this.getAllChannel();
	}
	// getTotalWorkHour(){
	// 	this.wschedule.getTotalWorkHour(this.startDate,this.endDate).subscribe({
	// 		next:(item) => {
	// 			this.workhours =  item.workHour;
	// 			this.collectionSize = this.workhours.length;
	// 		}
	// 	})
	// }
	getAllAgent(){
		this.empService.getAgent().subscribe({
			next:(res)=>{
				this.agents = res.agent;
			}
		})
	}

	getAllChannel(){
		this.channelService.getAllChannel().subscribe({
			next: (item)=>{
				this.channels = item;
			}
		})
	}


	refreshWorkHour() {
		const data = this.filterForm.value;
		this.wschedule.getTotalWorkHour(data.startDate , data.endDate).subscribe({
			next: (response) => {
			  this.collectionSize = response.workHour.length; // Cập nhật tổng số mục
			  this.workhours = response.workHour
				.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); // Cập nhật dữ liệu trên trang hiện tại
			},
			error: (error) => {
			  console.error('Error fetching data:', error);
			}
		})
	}

	//onSubmit
	onSubmit(){
		const data = this.filterForm.value;
		console.log('data', data)
		if(data.EmployeeID == 'All' && data.ChannelID == 'All'){
			this.wschedule.getTotalWorkHour(data.startDate, data.endDate).subscribe({
				next : (item) => {
					this.workhours =  item.workHour;
					this.collectionSize = this.workhours.length;
				}
			})
		} else if(data.EmployeeID && data.startDate && data.endDate && data.ChannelID){
			this.wschedule.getTotalWorkHourWithAllFilter(data.EmployeeID, data.startDate, data.endDate, data.ChannelID).subscribe({
				next: (item) => {
					console.log(' item : ', item);
					this.workhours = item.totalNumberWorkHours;
					this.collectionSize = this.workhours.length;
				}
			})
		}
	}

	
	//calendar
  calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}


}
