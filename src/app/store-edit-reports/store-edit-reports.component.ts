import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreServicesService } from '../MyServices/store-services.service';
import { NgForm } from '@angular/forms';
interface UserProfile {
     reviewer: string;
     tester: string;
   }

@Component({
  selector: 'app-store-edit-reports',
  templateUrl: './store-edit-reports.component.html',
})
export class StoreEditReportsComponent implements OnInit {
  sampleCode: any = {};
  testReport: any = {
     
  };
  responseMessage: string = '';
  searchflag: boolean = false;
  step: number = 1;
  updatereportsForm:any={};   
  dtrCapacities: any[] = [];
  refStandards: any[] = [];
  customerList: any[] = [];
  tester_reviewer!: UserProfile;
  processing_msgs='';

 

constructor(
  private storeServices: StoreServicesService,
  private ActiveR: ActivatedRoute,
  private router: Router
) {
  this.ActiveR.queryParams.subscribe(params => {
    this.updatereportsForm = { ...params };
    this.sampleCode = params['samplecode'];
    
    if (this.sampleCode) {
      this.fetchTestReport(this.sampleCode);
    }
  });
}

  

  ngOnInit(): void {
    this.fetchTestReport(this.sampleCode);
    this.getjobrating();
    this.getrefrestandardlist();
    this.getregisteredcustomer();
    this.gettesterreviewer();
  
  }
  reviewer_list: any[] = [];
  tester_list: any[] = [];
  gettesterreviewer(){
    this.storeServices.getalltesterreviewer().subscribe({
      next: (data: { employee_type: string }[]) => {
        this.reviewer_list = data.filter((item) => item.employee_type === 'REVIEWER');
        this.tester_list = data.filter((item) => item.employee_type === 'TESTER');
      },
      error: (err) => {
        console.log(err);
        this.tester_reviewer = err.error;
      }
    });
  }
  getregisteredcustomer(){
    this.storeServices.getcustomername().subscribe({
      next: (data) => {
        this.customerList = data;
      },
      error: (err) => {
        this.testReport.customer_name_and_address = err;
        console.log(err);
      }
    });
  }
  getrefrestandardlist(){
    this.storeServices.getrefstandard().subscribe({
      next: (data) => {
        this.refStandards = data;
      },
      error: (err) => {
        this.testReport.reference_standard = err;
        console.log(err);
      }
    });
  }
  getjobrating(){
    this.storeServices.getjobrating().subscribe({
      next: (data) => {
        this.dtrCapacities = data;
      },
      error: (err) => {
        this.testReport.job_rating = err;
        console.log(err);
      }
    });
  }
 


fetchTestReport(sampleCode: any): void {
    this.storeServices.loadReportsforedit(sampleCode).subscribe({
        next: (data) => {
            this.testReport = data;
        },
        error: (error) => {
            console.error('Fetch Error:', error);
            this.responseMessage = error.error || 'Failed to load report.';
            alert(this.responseMessage);
        }
    });
}


editreports(formData:NgForm): void {
     if (formData.valid) {
    this.storeServices.updatetestreport(this.testReport).subscribe({
      next: (response) => {
        this.responseMessage = response.msg;
        alert(this.responseMessage);
        this.searchflag = false;
        this.router.navigate(['store-home/store-view-reports']);
      },
      error: (error) => {
        this.responseMessage = error.error.msg;
        alert(this.responseMessage);
        this.searchflag = false;
      }
    });
  }
  else {
    alert('Please fill in the required fields.');
  }
  }

  nextStep(): void {
    if (this.step < 2) this.step++;
  }

  previousStep(): void {
    if (this.step > 1) this.step--;
  }


  createsample_remarks2() {
    const value_1 = Number(this.testReport.value_1);
    const value_2 = Number(this.testReport.value_2);
    const value_3 = Number(this.testReport.value_3);
    if ((value_1 > 43.78 && value_1 < 44.22) && (value_2 > 43.78 && value_2 < 44.22) && (value_3 > 43.78 && value_3 < 44.22)) {
      this.testReport.sample_remarks2 = 'Complied and Vector group Dyn11 Found & Confirmed.';
    } else {
      this.testReport.sample_remarks2 = 'Not Complied and Vector group Dyn11 Found & Confirmed.';
      const inputElements = document.querySelectorAll<HTMLInputElement>('#value_1, #value_2, #value_3');
      inputElements.forEach(element => {
        if ((element.id === 'value_1' && (value_1 < 43.78 || value_1 > 44.22)) ||
          (element.id === 'value_2' && (value_2 < 43.78 || value_2 > 44.22)) ||
          (element.id === 'value_3' && (value_3 < 43.78 || value_3 > 44.22))) {
          element.style.backgroundColor = 'red';
        }
      });
    }
  }

  calculateHV() {
    if (this.testReport.hv_kv && this.testReport.job_rating) {
      this.testReport.hv = String((Number(this.testReport.job_rating) / (1.732 * (Number(this.testReport.hv_kv)))).toFixed(2));
    }
  }
  calculateLV() {
    if (this.testReport.lv_v && this.testReport.job_rating) {
      this.testReport.lv = String((Number(this.testReport.job_rating) / (1.732 * Number(this.testReport.lv_v))).toFixed(2));
    }
  }

  calculateAvgResist() {
    const r1 = Number(this.testReport.resist_1);
    const r2 = Number(this.testReport.resist_2);
    const r3 = Number(this.testReport.resist_3);
    if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
      this.testReport.avg_resist = String(((r1 + r2 + r3) / 3).toFixed(2));
    }
  }
  calculatePhaseResist1() {
    const avgResist = Number(this.testReport.avg_resist);
    const avgTempHV = Number(this.testReport.avg_temp_hv);
    if (!isNaN(avgResist) && !isNaN(avgTempHV)) {
      this.testReport.phase_resist_hv = String(((avgResist * ((225 + 75) / (225 + avgTempHV)))*1.5).toFixed(2));
    }
  }

  calculateAvgResistLv() {
    const r1 = Number(this.testReport.resist_lv_1);
    const r2 = Number(this.testReport.resist_lv_2);
    const r3 = Number(this.testReport.resist_lv_3);
    if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
      this.testReport.avg_resist_lv = String(((r1 + r2 + r3) / 3).toFixed(2));
    }
  }
  calculatePhaseResistLv2() {
    const avgResistLv = Number(this.testReport.avg_resist_lv);
    const avgTempLV = Number(this.testReport.avg_temp_lv);
    if (!isNaN(avgResistLv) && !isNaN(avgTempLV)) {
      this.testReport.phase_resist_lv = String(((avgResistLv * ((225 + 75) / (225 + avgTempLV)))/2).toFixed(2));
    }
  }

  calculatenoload_testPCW() {
    const voltagerms = Number(this.testReport.voltage_vrms);
    const voltagemeans = Number(this.testReport.voltage_mean);
    const pmNL = Number(this.testReport.pm_nl);
    if (!isNaN(voltagerms) && !isNaN(voltagemeans) && !isNaN(pmNL)) {
      // this.testReport.pc_nl = String((pmNL /(0.5+(0.5*(Math.sqrt((voltagerms/voltagemeans)))))).toFixed(2)); 
      this.testReport.pc_nl = String((pmNL /(0.5+(0.5*(Math.pow((voltagerms/voltagemeans),2))))).toFixed(2)); 
    }
  }



  total_load_50and100() {
    const pcNlNum = Number(this.testReport.pc_nl);
    const loadLoss50Num = Number(this.testReport.load_loss_50);
    const loadLoss100Num = Number(this.testReport.load_loss_100);

    if (!isNaN(pcNlNum) && !isNaN(loadLoss50Num) && !isNaN(loadLoss100Num)) {
      this.testReport.obtained_2 = (pcNlNum + loadLoss50Num).toFixed(2);
      this.testReport.obtained_3 = (pcNlNum + loadLoss100Num).toFixed(2);
    }
  }

  load_complied() {
    const percentZ100 = Number(this.testReport.percent_z_100);
    const obtained2 = Number(this.testReport.obtained_2);
    const obtained3 = Number(this.testReport.obtained_3);

    if (!isNaN(percentZ100)) {
      if (percentZ100 >= 4.05 && percentZ100 <= 4.95) { 
        this.testReport.remark_1 = "Complied";
      } else {
        this.testReport.remark_1 = "Not Complied";
      }
    }

    if (!isNaN(obtained2)) {
      this.testReport.remark_2 = obtained2 < Number(this.testReport.particular_validate_0_50) ? "Complied" : "Not Complied";
    }

    if (!isNaN(obtained3)) {
      this.testReport.remark_3 = obtained3 <  Number(this.testReport.particular_validate_0_100) ? "Complied" : "Not Complied";
    }
    this.testReport.ambient_temp = this.testReport.avg_temp_hv;
  }

  calculate_loadloss_test() {
    const Reference_Temp = 75;
    const Metal_Value_For_CuAl = 225;
    const Rated_Frequency = 50;
    
    try {
      const jobRatingNum = Number(this.testReport.job_rating);
      const hvKV = Number(this.testReport.hv_kv);
      const lvV = Number(this.testReport.lv_v);

      const avgResist = Number(this.testReport.avg_resist);
      const avgResistLv = Number(this.testReport.avg_resist_lv);
      const avgTempHV = Number(this.testReport.avg_temp_hv);

      const temp50 = Number(this.testReport.temp_50);
      const freq50 = Number(this.testReport.freq_50);
      const curr50 = Number(this.testReport.curr_50);
      const pm50 = Number(this.testReport.pm_50);

      const temp100 = Number(this.testReport.temp_100);
      const freq100 = Number(this.testReport.freq_100);
      const curr100 = Number(this.testReport.curr_100);
      const pm100 = Number(this.testReport.pm_100);

      const Rated_Current_HV_50 = parseFloat(((jobRatingNum) / (hvKV * 1.732)/2).toFixed(2)); 
      const Rated_Current_LV_50 = parseFloat(((jobRatingNum) / (lvV * 1.732)/2).toFixed(2)); 
      const Rated_Current_HV_100 = parseFloat((jobRatingNum / (hvKV * 1.732)).toFixed(2)); 
      const Rated_Current_LV_100 = parseFloat((jobRatingNum / (lvV * 1.732)).toFixed(2));

      const Cal_Avg_Resistance_LV_Ohm_50 = (avgResistLv / 1000) / 2;
      const Cal_Avg_Resistance_LV_Ohm_100 = (avgResistLv / 1000) / 2;

      const I2_R_hv_50 = 3 * Math.pow(Rated_Current_HV_50 / 1.732, 2) * avgResist * 1.5;
      const I2_R_hv_100 = 3 * Math.pow(Rated_Current_HV_100 / 1.732, 2) * avgResist * 1.5;
      
      const I2_R_lv_50 = ( 3 * Math.pow(Rated_Current_LV_50, 2) * (avgResistLv/1000)) / 2;
      const I2_R_lv_100 =( 3 * Math.pow(Rated_Current_LV_100, 2) * (avgResistLv/1000))/2;

      const Total_Copper_Losses_At_Oil_Temp_50 = I2_R_hv_50 + I2_R_lv_50;
      const Total_Copper_Losses_At_Oil_Temp_100 = I2_R_hv_100 + I2_R_lv_100;

      const Total_Copper_Losses_at_Avg_Temp_50 = ((Metal_Value_For_CuAl + temp50) / (Metal_Value_For_CuAl + avgTempHV)) * Total_Copper_Losses_At_Oil_Temp_50;
      const Total_Copper_Losses_at_Avg_Temp_100 = ((Metal_Value_For_CuAl + temp100) / (Metal_Value_For_CuAl + avgTempHV)) * Total_Copper_Losses_At_Oil_Temp_100;

      const Corrected_Load_Loss_LLC_50 = Math.pow(Rated_Current_HV_50 / curr50, 2) * pm50;
      const Corrected_Load_Loss_LLC_100 = Math.pow(Rated_Current_HV_100 / curr100, 2) * pm100;

      const Stray_Loss_At_AvgTemp_50 = Corrected_Load_Loss_LLC_50 - Total_Copper_Losses_at_Avg_Temp_50;
      const Stray_Loss_At_AvgTemp_100 = Corrected_Load_Loss_LLC_100 - Total_Copper_Losses_at_Avg_Temp_100;

      const Total_Copper_Losses_At_Ref_Temp_50 = ((Metal_Value_For_CuAl + Reference_Temp) / (Metal_Value_For_CuAl + avgTempHV)) * Total_Copper_Losses_at_Avg_Temp_50;
      const Total_Copper_Losses_At_Ref_Temp_100 = ((Metal_Value_For_CuAl + Reference_Temp) / (Metal_Value_For_CuAl + avgTempHV)) * Total_Copper_Losses_at_Avg_Temp_100;

      const Stray_Loss_at_Rated_Frequency_75_50 = ((Metal_Value_For_CuAl + avgTempHV) / (Metal_Value_For_CuAl + Reference_Temp)) * Stray_Loss_At_AvgTemp_50;
      const Stray_Loss_at_Rated_Frequency_75_100 = ((Metal_Value_For_CuAl + avgTempHV) / (Metal_Value_For_CuAl + Reference_Temp)) * Stray_Loss_At_AvgTemp_100;

      const Stray_Loss_at_Test_Frequency_75_50 = Math.pow(Rated_Frequency / freq50, 2) * Stray_Loss_at_Rated_Frequency_75_50;
      const Stray_Loss_at_Test_Frequency_75_100 = Math.pow(Rated_Frequency / freq100, 2) * Stray_Loss_at_Rated_Frequency_75_100;

      const Load_Loss_at_Rated_Frequency_75_50 = Stray_Loss_at_Rated_Frequency_75_50 + Total_Copper_Losses_At_Ref_Temp_50;
      const Load_Loss_at_Rated_Frequency_75_100 = Stray_Loss_at_Rated_Frequency_75_100 + Total_Copper_Losses_At_Ref_Temp_100;

      const Load_Loss_at_Test_Frequency_75_50 = Stray_Loss_at_Test_Frequency_75_50 + Total_Copper_Losses_At_Ref_Temp_50;
      const Load_Loss_at_Test_Frequency_75_100 = Stray_Loss_at_Test_Frequency_75_100 + Total_Copper_Losses_At_Ref_Temp_100;

      this.testReport.load_loss_50 = Load_Loss_at_Test_Frequency_75_50.toFixed(2);
      this.testReport.load_loss_100 = Load_Loss_at_Test_Frequency_75_100.toFixed(2);

      const V_Meas_From_Load_Loss_Test_50 = Number(this.testReport.volt_50);
      const V_Meas_From_Load_Loss_Test_100 = Number(this.testReport.volt_100);

      const Corr_Volt_V_50 = V_Meas_From_Load_Loss_Test_50 *(Rated_Current_HV_50/curr50);
      const Corr_Volt_V_100 = V_Meas_From_Load_Loss_Test_100 *(Rated_Current_HV_100/curr100);

      const Impedance_Z_At_AvgTemp_C_50 = ((Corr_Volt_V_50/1000) / (Number(this.testReport.hv_kv)))*100;
      const Impedance_Z_At_AvgTemp_C_100 = ((Corr_Volt_V_100/1000) / (Number(this.testReport.hv_kv)))*100;

      const Resistance_CorR_At_AvgTemp_C_50 = (Corrected_Load_Loss_LLC_50/ (jobRatingNum * 1000))*100;
      const Resistance_CorR_At_AvgTemp_C_100 = (Corrected_Load_Loss_LLC_100/ (jobRatingNum * 1000))*100;

      const Reactance_CorR_At_RefTemp_C_50 = Math.sqrt(
        Math.pow(Impedance_Z_At_AvgTemp_C_50, 2) - Math.pow(Resistance_CorR_At_AvgTemp_C_50, 2)
      );
      const Reactance_CorR_At_RefTemp_C_100 = Math.sqrt(
        Math.pow(Impedance_Z_At_AvgTemp_C_100, 2) - Math.pow(Resistance_CorR_At_AvgTemp_C_100, 2)
      );

      const Resistance_R_At_RefTemp_C_50 = (Load_Loss_at_Test_Frequency_75_50/(jobRatingNum * 1000))*100;
      const Resistance_R_At_RefTemp_C_100 = (Load_Loss_at_Test_Frequency_75_100/(jobRatingNum * 1000))*100;

      const final_Impedance_Z_At_RefTemp_C_50 = Math.sqrt(
        Math.pow(Reactance_CorR_At_RefTemp_C_50, 2) + Math.pow(Resistance_R_At_RefTemp_C_50, 2)
      );
      const final_Impedance_Z_At_RefTemp_C_100 = Math.sqrt(
        Math.pow(Reactance_CorR_At_RefTemp_C_100, 2) + Math.pow(Resistance_R_At_RefTemp_C_100, 2)
      );

      const Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_50 =
        (Rated_Frequency / freq50) * final_Impedance_Z_At_RefTemp_C_50;
      const Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_100 =
        (Rated_Frequency / freq100) * final_Impedance_Z_At_RefTemp_C_100;

      this.testReport.percent_z_50 = Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_50.toFixed(2);
      this.testReport.percent_z_100 = Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_100.toFixed(2);

      console.log({
  'Reference_Temp': Reference_Temp,
  'Metal_Value_For_CuAl': Metal_Value_For_CuAl,
  'Rated_Frequency': Rated_Frequency,
  'jobRatingNum': jobRatingNum,
  'hvKV': hvKV,
  'lvV': lvV,
  'avgResist': avgResist,
  'avgResistLv': avgResistLv,
  'avgTempHV': avgTempHV,
  'temp50': temp50,
  'freq50': freq50,
  'curr50': curr50,
  'pm50': pm50,
  'temp100': temp100,
  'freq100': freq100,
  'curr100': curr100,
  'pm100': pm100,
  'Rated_Current_HV_50': Rated_Current_HV_50,
  'Rated_Current_LV_50': Rated_Current_LV_50,
  'Rated_Current_HV_100': Rated_Current_HV_100,
  'Rated_Current_LV_100': Rated_Current_LV_100,
  'Cal_Avg_Resistance_LV_Ohm_50': Cal_Avg_Resistance_LV_Ohm_50,
  'Cal_Avg_Resistance_LV_Ohm_100': Cal_Avg_Resistance_LV_Ohm_100,
  'I2_R_hv_50': I2_R_hv_50,
  'I2_R_hv_100': I2_R_hv_100,
  'I2_R_lv_50': I2_R_lv_50,
  'I2_R_lv_100': I2_R_lv_100,
  'Total_Copper_Losses_At_Oil_Temp_50': Total_Copper_Losses_At_Oil_Temp_50,
  'Total_Copper_Losses_At_Oil_Temp_100': Total_Copper_Losses_At_Oil_Temp_100,
  'Total_Copper_Losses_at_Avg_Temp_50': Total_Copper_Losses_at_Avg_Temp_50,
  'Total_Copper_Losses_at_Avg_Temp_100': Total_Copper_Losses_at_Avg_Temp_100,
  'Corrected_Load_Loss_LLC_50': Corrected_Load_Loss_LLC_50,
  'Corrected_Load_Loss_LLC_100': Corrected_Load_Loss_LLC_100,
  'Stray_Loss_At_AvgTemp_50': Stray_Loss_At_AvgTemp_50,
  'Stray_Loss_At_AvgTemp_100': Stray_Loss_At_AvgTemp_100,
  'Total_Copper_Losses_At_Ref_Temp_50': Total_Copper_Losses_At_Ref_Temp_50,
  'Total_Copper_Losses_At_Ref_Temp_100': Total_Copper_Losses_At_Ref_Temp_100,
  'Stray_Loss_at_Rated_Frequency_75_50': Stray_Loss_at_Rated_Frequency_75_50,
  'Stray_Loss_at_Rated_Frequency_75_100': Stray_Loss_at_Rated_Frequency_75_100,
  'Stray_Loss_at_Test_Frequency_75_50': Stray_Loss_at_Test_Frequency_75_50,
  'Stray_Loss_at_Test_Frequency_75_100': Stray_Loss_at_Test_Frequency_75_100,
  'Load_Loss_at_Rated_Frequency_75_50': Load_Loss_at_Rated_Frequency_75_50,
  'Load_Loss_at_Rated_Frequency_75_100': Load_Loss_at_Rated_Frequency_75_100,
  'Load_Loss_at_Test_Frequency_75_50': Load_Loss_at_Test_Frequency_75_50,
  'Load_Loss_at_Test_Frequency_75_100': Load_Loss_at_Test_Frequency_75_100,
  'V_Meas_From_Load_Loss_Test_50': V_Meas_From_Load_Loss_Test_50,
  'V_Meas_From_Load_Loss_Test_100': V_Meas_From_Load_Loss_Test_100,
  'Corr_Volt_V_50': Corr_Volt_V_50,
  'Corr_Volt_V_100': Corr_Volt_V_100,
  'Impedance_Z_At_AvgTemp_C_50': Impedance_Z_At_AvgTemp_C_50,
  'Impedance_Z_At_AvgTemp_C_100': Impedance_Z_At_AvgTemp_C_100,
  'Resistance_CorR_At_AvgTemp_C_50': Resistance_CorR_At_AvgTemp_C_50,
  'Resistance_CorR_At_AvgTemp_C_100': Resistance_CorR_At_AvgTemp_C_100,
  'Reactance_CorR_At_RefTemp_C_50': Reactance_CorR_At_RefTemp_C_50,
  'Reactance_CorR_At_RefTemp_C_100': Reactance_CorR_At_RefTemp_C_100,
  'Resistance_R_At_RefTemp_C_50': Resistance_R_At_RefTemp_C_50,
  'Resistance_R_At_RefTemp_C_100': Resistance_R_At_RefTemp_C_100,
  'final_Impedance_Z_At_RefTemp_C_50': final_Impedance_Z_At_RefTemp_C_50,
  'final_Impedance_Z_At_RefTemp_C_100': final_Impedance_Z_At_RefTemp_C_100,
  'Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_50': Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_50,
  'Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_100': Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_100
});


    } catch (error) {
      console.error('Error in calculate_loadloss_test:', error);
    }
	  
      this.total_load_50and100();
   
  }


}


