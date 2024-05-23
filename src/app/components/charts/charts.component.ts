import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getStyle, hexToRgb, hexToRgba } from '@coreui/utils';
import { CallAndAgentService } from 'src/app/services/callAndAgent.service';
import { fill } from 'lodash-es';
import { DateService } from '../../services/date.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit {
  startOfPreviousWeek!: string;
  endOfPreviousWeek!: string;
  data:any;
  options = {
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    }
  }
  
  constructor( 
    private callAndAgentData : CallAndAgentService,
    private dateService : DateService,
    private datePipe : DatePipe
  ){

  }
  ngOnInit(): void {
    this.initChart();
    this.initDate();
  }

  initDate(){
    const currentDate = new Date();
    const weekBounds = this.dateService.getStartAndEndOfPreviousWeek(currentDate);
    this.startOfPreviousWeek = this.datePipe.transform(weekBounds.startOfWeek, 'dd/MM/yyyy')!;
    this.endOfPreviousWeek = this.datePipe.transform(weekBounds.endOfWeek, 'dd/MM/yyyy')!;    console.log('Start of Previous Week:', this.startOfPreviousWeek);
    console.log('End of Previous Week:', this.endOfPreviousWeek);
  }

  initChart(): void{
    this.callAndAgentData.getCallAndAgentByWeek().subscribe({
      next : (item)=> {
          const call = item.callAndAgent.map((item:any)=> item.TotalCalls);
          const agent = item.callAndAgent.map((item:any)=> item.TotalAgents);
          // this.data.datasets[0].data = call;
          // this.data.datasets[1].data = agent;
          this.data = {
            labels: ['Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'],
            datasets: [
              {
                label: 'Call',
                backgroundColor: '#F0B118',
                borderColor: '#F0B118',
                pointBackgroundColor: '#F0B118',
                pointBorderColor: '#fff',
                data: call,
                fill: false,
                tension: 0.1,
                showLine: true
              },
              {
                label: 'Agent',
                backgroundColor: 'rgba(151, 187, 205, 0.2)',
                borderColor: 'rgba(151, 187, 205, 1)',
                pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                pointBorderColor: '#fff',
                data: agent,
                fill: origin,
                tension: 0.1,
                showLine: true
               
              }
            ],
          };
      }
    })
  }
}
