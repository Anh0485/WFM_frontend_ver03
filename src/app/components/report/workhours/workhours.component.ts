import {
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  OnInit,
  inject,
  TemplateRef,
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { WScheduleService } from 'src/app/services/workschedule.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ChannelService } from 'src/app/services/channel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OvertimeService } from 'src/app/services/overtime.service';
import { TotalService } from 'src/app/services/total.service';
import {Country} from '../../../model/country';
import {NgbdSortableHeader, SortEvent} from '../../../directives/sortable.directive'

//table
const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

const COUNTRIES: Country[] = [
  {
    id: 1,
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area:  234556456,
    population: 146989754,
  },
  {
    id: 2,
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 534435345,
    population: 36624199,
  },
 
];


interface CombinedData {
  EmployeeID: number;
  fullname: string;
  ChannelName: string;
  TOTALWORKINGHOURS: string;
  totalOvertimeHour: number;
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
	`,
})
export class WorkhoursComponent implements OnInit {
  overtimeHour!: any[];
  detailOvertimeHour !:any [];
  workhours!: CombinedData[];
  // workhours!: any[];
  agents!: any[];
  channels!: any[];
  combinedData!: any[];
  startDate = '2024-01-01';
  endDate = '2024-05-01';
  countries = COUNTRIES; //table

  // pagination
  page = 1;
  pageSize = 2;
  collectionSize = 0;

  //filter
  filterForm!: FormGroup;

  //modal

  private modalService = inject(NgbModal);

  constructor(
    private totalService: TotalService,
    private empService: EmployeeService,
    private channelService: ChannelService,
    private overtimeService: OvertimeService,
    private wschedule: WScheduleService,
    private _fb: FormBuilder
  ) {
    // this.refreshWorkHour();
    this.filterForm = this._fb.group({
      EmployeeID: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      ChannelID: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTotalWorkHour();
    this.getAllAgent();
    this.getAllChannel();
  }
  // getTotalWorkHour() {
  //   this.totalService
  //     .getTotalWorkHourandOvertimeHour(this.startDate, this.endDate)
  //     .subscribe({
  //       next: (item) => {
  // 		  console.log('item',  item)
  //         this.workhours = item;
  //         console.log('workhours', this.workhours);
  //         this.workhours.forEach(item => {
  //           const overtimeItem = this.workhours.overtimeHour.find((ot:any) =>
  //            ot.EmployeeID === item.overtimeHour.EmployeeID
  //           )
  //         })
  //         this.collectionSize = this.workhours.length;
  //       },
  //     });
  // }

  getTotalWorkHour() {
    this.totalService
      .getTotalWorkHourandOvertimeHour(this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          console.log('item', data);

          let hour: CombinedData[] = [];

          data.workHour.forEach((workItem: any) => {
            const overtimeItem = data.overtimeHour.find(
              (ot: any) => ot.EmployeeID === workItem.EmployeeID
            );
            if (overtimeItem) {
              hour.push({
                EmployeeID: workItem.EmployeeID,
                fullname: workItem.fullname,
                ChannelName: workItem.ChannelName,
                TOTALWORKINGHOURS: workItem.TOTALWORKINGHOURS,
                totalOvertimeHour: overtimeItem.totalOvertimeHour,
              });
            }
          });

          this.workhours = hour;
          console.log('workhours', this.workhours)
          this.collectionSize = this.workhours.length;
        },
      });
  }

  getAllAgent() {
    this.empService.getAgent().subscribe({
      next: (res) => {
        this.agents = res.agent;
      },
    });
  }

  getAllChannel() {
    this.channelService.getAllChannel().subscribe({
      next: (item) => {
        this.channels = item;
      },
    });
  }

  refreshWorkHour() {
    const data = this.filterForm.value;
    this.totalService
      .getTotalWorkHourandOvertimeHour(data.startDate, data.endDate)
      .subscribe({
        next: (response) => {
          this.collectionSize = response.workHour.length; 
          this.workhours = response.workHour.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          ); // Cập nhật dữ liệu trên trang hiện tại
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }

  //onSubmit
  onSubmit() {
    const data = this.filterForm.value;
    console.log('data', data);
    if (data.EmployeeID == 'All' && data.ChannelID == 'All') {
      this.totalService
        .getTotalWorkHourandOvertimeHour(data.startDate, data.endDate)
        .subscribe({
          next: (item) => {
            this.workhours = item.workHour;
            this.collectionSize = this.workhours.length;
          },
        });
    } else if (
      data.EmployeeID &&
      data.startDate &&
      data.endDate &&
      data.ChannelID
    ) {
      this.wschedule
        .getTotalWorkHourWithAllFilter(
          data.EmployeeID,
          data.startDate,
          data.endDate,
          data.ChannelID
        )
        .subscribe({
          next: (item) => {
            console.log(' item : ', item);
            this.workhours = item.totalNumberWorkHours;
            this.collectionSize = this.workhours.length;
          },
        });
    }
  }

  //modal

  openDetailOvertimeHourModal(content: TemplateRef<any>, hour:any) {
    console.log('hour.employeeID', hour.EmployeeID);
    this.overtimeService.getDetailOvertimeHourOnDate(this.startDate, this.endDate, hour.EmployeeID).subscribe({
      next: (data) => {
        this.detailOvertimeHour = data.detailOvertimeHour;
      }
    })
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  //calendar
  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(
    this.calendar.getToday(),
    'd',
    10
  );

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
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
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  //sorttable
  

  @ViewChildren(NgbdSortableHeader) headers?: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    if(this.headers){
      for (const header of this.headers) {
        if (header.sortable !== column) {
          header.direction = '';
        }
      }
    }
  	// sorting countries
  	if (direction === '' || column === '') {
  		this.countries = COUNTRIES;
  	} else {
  		this.countries = [...COUNTRIES].sort((a, b) => {
  			const res = compare(a[column], b[column]);
  			return direction === 'asc' ? res : -res;
  		});
  	}
  }

 
}
