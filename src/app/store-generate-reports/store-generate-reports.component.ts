import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';
interface UserProfile {
     reviewer: string;
     tester: string;
   }
   
@Component({
  selector: 'app-store-generate-reports',
  templateUrl: './store-generate-reports.component.html',
  styleUrls: ['./store-generate-reports.component.css']
})
export class StoreGenerateReportsComponent {
processing_tags=false; 

  testReport = {
    template_version: 'V1',
    ULR_No:'',
    serial_no: '',
    manufacturer: '',
    job_rating: '',
    reference_standard: '',
    date_of_receipt: '',
    date_of_testing: '',
    date_of_issue: '',
    customer_name_and_address: '',
    sample_remarks1: '',
    vector_group: 'Dyn11',
    hv_kv: '11',
    lv_v: '0.433',
    hv: '',
    lv: '',
    value_1: '',
    value_2: '',
    value_3: '',
    limit_1: 'Acceptance Limit:- @0.5% limit',
    sample_remarks2: '',
    avg_temp_hv: '',
    resist_1: '',
    resist_2: '',
    resist_3: '',
    avg_resist: '',
    phase_resist_hv: '',
    avg_temp_lv: '',
    resist_lv_1: '',
    resist_lv_2: '',
    resist_lv_3: '',
    avg_resist_lv: '',
    phase_resist_lv: '',
    time: '60 Sec',
    temp_ir: '',
    hv_e: '',
    lv_e: '',
    hv_lv: '',
    voltage_vrms: '',
    voltage_mean: '',
    freq_nl: '',
    current_nl: '',
    pm_nl: '',
    pc_nl: '',
    temp_50: '',
    freq_50: '',
    volt_50: '',
    curr_50: '',
    pm_50: '',
    load_loss_50: '',
    percent_z_50: '',
    temp_100: '',
    freq_100: '',
    volt_100: '',
    curr_100: '',
    pm_100: '',
    load_loss_100: '',
    percent_z_100: '',
    Required_0_50: '218.5',
    Required_0_100: '730',
    required_1: '',
    obtained_1: '',
    remark_1: '',
    required_2: '',
    obtained_2: '',
    remark_2: '',
    required_3: '',
    obtained_3: '',
    remark_3: '',
    remark_4: '',
    remark_5: '',
    remark_6: ' As per RCA (MD/WZ/06/PUR/1620), a 15% tolerance is considered in the Load Loss Test for Level-1 (Old) and Level-2 (Old). For Non-Star (New Design), the %Z value is not considered in the decision rule, as per the meeting held with ACE Store, O/o MD, on 27.02.2023.',
    tester: '',
    reviewer: '',
    humidity: '',
    ambient_temp: '',
    tester_designation: '',
    reviewer_designation: ''
  };
  dtrCapacities: any[] = [];
  refStandards: any[] = [];
  customerList: any[] = [];
  tester_reviewer!: UserProfile;
  tester_list: any[] = [];
  reviewer_list: any[] = [];
  tesertReviewersdata: any[] = [];
  processing_msgs='';
  ngOnInit(): void {
    // this.getsamplecodelist();
    this.getjobrating();
    this.getrefrestandardlist();
    this.getregisteredcustomer();
    // this.getprofiles();
    this.gettesterreviewer();
  }
rowSelection: string = 'all';

showRow1 = true;
showRow2 = true;
showRow3 = true;

updateRows(): void {
  if (this.rowSelection === 'all') {
    this.showRow1 = true;
    this.showRow2 = true;
    this.showRow3 = true;
  } else {
    this.showRow1 = this.rowSelection === 'row1';
    this.showRow2 = this.rowSelection === 'row2';
    this.showRow3 = this.rowSelection === 'row3';
  }
}

loadSelection: string = 'all'; 
showLoad50: boolean = true; 
showLoad100: boolean = true; 

updateLoadRows(): void {
  if (this.loadSelection === 'all') {
    this.showLoad50 = true;
    this.showLoad100 = true;
  } else {
    this.showLoad50 = this.loadSelection === '50';
    this.showLoad100 = this.loadSelection === '100';
  }
}





gettesterreviewer() {
  this.storeServices.gettesterreviewer().subscribe({
    next: (data) => {
      if (Array.isArray(data)) {
        this.tesertReviewersdata = data;
        this.tester_list = this.tesertReviewersdata.filter(item => item.employee_type === 'TESTER');
        this.reviewer_list = this.tesertReviewersdata.filter(item => item.employee_type === 'REVIEWER');
        console.log(`Tester: ${this.tester_list}, Reviewer: ${this.reviewer_list}`);
      } else {
        console.warn('Received data is not an array:', data);
      }
    },
    error: (err) => {
      console.error('Error fetching tester/reviewer data:', err);
    }
  });
}

  
  getprofiles(){
    this.storeServices.getuserprofile().subscribe({
      next: (data: UserProfile) => {
        this.testReport.tester = data.tester;
        this.testReport.reviewer = data.reviewer;
      },
      error: (err) => {
         this.tester_reviewer = err.error;
        console.log(err);
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
 

  constructor(private storeServices: StoreServicesService) { }
  step = 1;

  nextStep() {
    if (this.step < 2) this.step++;
  }

  previousStep() {
    if (this.step > 1) this.step--;
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.processing_tags = true;  
      this.storeServices.adddtestreportdata(this.testReport).subscribe({
        next: (response) => {
          this.processing_tags = false;      
          this.processing_msgs = response.msg + 'Sample Code:' + response.samplecode;  
          alert(this.processing_msgs);
          // this.formreset();
        },
        error: (error) => {
           this.processing_msgs = error.error;  
            alert(this.processing_msgs);
          this.processing_tags = false;  
        }
      });
   
      this.step = 1;
    } 
  }
  formreset() {
    this.testReport = {
    template_version: 'V1',
    ULR_No:'',
    serial_no: '',
    manufacturer: '',
    job_rating: '',
    reference_standard: '',
    date_of_receipt: '',
    date_of_testing: '',
    date_of_issue: '',
    customer_name_and_address: '',
    sample_remarks1: '',
    vector_group: '',
    hv_kv: '',
    lv_v: '',
    hv: '',
    lv: '',
    value_1: '',
    value_2: '',
    value_3: '',
    limit_1: '',
    sample_remarks2: '',
    avg_temp_hv: '',
    resist_1: '',
    resist_2: '',
    resist_3: '',
    avg_resist: '',
    phase_resist_hv: '',
    avg_temp_lv: '',
    resist_lv_1: '',
    resist_lv_2: '',
    resist_lv_3: '',
    avg_resist_lv: '',
    phase_resist_lv: '',
    time: '',
    temp_ir: '',
    hv_e: '',
    lv_e: '',
    hv_lv: '',
    voltage_vrms: '',
    voltage_mean: '',
    freq_nl: '',
    current_nl: '',
    pm_nl: '',
    pc_nl: '',
    temp_50: '',
    freq_50: '',
    volt_50: '',
    curr_50: '',
    pm_50: '',
    load_loss_50: '',
    percent_z_50: '',
    temp_100: '',
    freq_100: '',
    volt_100: '',
    curr_100: '',
    pm_100: '',
    load_loss_100: '',
    percent_z_100: '',
    Required_0_50: '',
    Required_0_100: '',
    required_1: '',
    obtained_1: '',
    remark_1: '',
    required_2: '',
    obtained_2: '',
    remark_2: '',
    required_3: '',
    obtained_3: '',
    remark_3: '',
    remark_4: '',
    remark_5: '',
    remark_6: '',
    tester: '',
    reviewer: '',
    humidity: '',
    ambient_temp: '',
    tester_designation: '',
    reviewer_designation: ''
  };
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
      this.testReport.phase_resist_hv = String((avgResist * ((225 + 75) / (225 + avgTempHV))).toFixed(2));
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
      this.testReport.phase_resist_lv = String((avgResistLv * ((225 + 75) / (225 + avgTempLV))).toFixed(2));
    }
  }

  calculatenoload_testPCW() {
    const voltagerms = Number(this.testReport.voltage_vrms);
    const voltagemeans = Number(this.testReport.voltage_mean);
    const pmNL = Number(this.testReport.pm_nl);
    if (!isNaN(voltagerms) && !isNaN(voltagemeans) && !isNaN(pmNL)) {
      this.testReport.pc_nl = String((pmNL /(0.5+(0.5*(Math.sqrt((voltagerms/voltagemeans)))))).toFixed(2)); 
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
      this.testReport.remark_2 = obtained2 < Number(this.testReport.Required_0_50) ? "Complied" : "Not Complied";
    }

    if (!isNaN(obtained3)) {
      this.testReport.remark_3 = obtained3 < Number(this.testReport.Required_0_100) ? "Complied" : "Not Complied";
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

      const Rated_Current_HV_50 = ((jobRatingNum) / (hvKV * 1.732)/2);
      const Rated_Current_LV_50 = ((jobRatingNum) / (lvV * 1.732)/2);
      const Rated_Current_HV_100 = jobRatingNum / (hvKV * 1.732);
      const Rated_Current_LV_100 = jobRatingNum / (lvV * 1.732);

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

//       console.log({
//   'Reference_Temp': Reference_Temp,
//   'Metal_Value_For_CuAl': Metal_Value_For_CuAl,
//   'Rated_Frequency': Rated_Frequency,
//   'jobRatingNum': jobRatingNum,
//   'hvKV': hvKV,
//   'lvV': lvV,
//   'avgResist': avgResist,
//   'avgResistLv': avgResistLv,
//   'avgTempHV': avgTempHV,
//   'temp50': temp50,
//   'freq50': freq50,
//   'curr50': curr50,
//   'pm50': pm50,
//   'temp100': temp100,
//   'freq100': freq100,
//   'curr100': curr100,
//   'pm100': pm100,
//   'Rated_Current_HV_50': Rated_Current_HV_50,
//   'Rated_Current_LV_50': Rated_Current_LV_50,
//   'Rated_Current_HV_100': Rated_Current_HV_100,
//   'Rated_Current_LV_100': Rated_Current_LV_100,
//   'Cal_Avg_Resistance_LV_Ohm_50': Cal_Avg_Resistance_LV_Ohm_50,
//   'Cal_Avg_Resistance_LV_Ohm_100': Cal_Avg_Resistance_LV_Ohm_100,
//   'I2_R_hv_50': I2_R_hv_50,
//   'I2_R_hv_100': I2_R_hv_100,
//   'I2_R_lv_50': I2_R_lv_50,
//   'I2_R_lv_100': I2_R_lv_100,
//   'Total_Copper_Losses_At_Oil_Temp_50': Total_Copper_Losses_At_Oil_Temp_50,
//   'Total_Copper_Losses_At_Oil_Temp_100': Total_Copper_Losses_At_Oil_Temp_100,
//   'Total_Copper_Losses_at_Avg_Temp_50': Total_Copper_Losses_at_Avg_Temp_50,
//   'Total_Copper_Losses_at_Avg_Temp_100': Total_Copper_Losses_at_Avg_Temp_100,
//   'Corrected_Load_Loss_LLC_50': Corrected_Load_Loss_LLC_50,
//   'Corrected_Load_Loss_LLC_100': Corrected_Load_Loss_LLC_100,
//   'Stray_Loss_At_AvgTemp_50': Stray_Loss_At_AvgTemp_50,
//   'Stray_Loss_At_AvgTemp_100': Stray_Loss_At_AvgTemp_100,
//   'Total_Copper_Losses_At_Ref_Temp_50': Total_Copper_Losses_At_Ref_Temp_50,
//   'Total_Copper_Losses_At_Ref_Temp_100': Total_Copper_Losses_At_Ref_Temp_100,
//   'Stray_Loss_at_Rated_Frequency_75_50': Stray_Loss_at_Rated_Frequency_75_50,
//   'Stray_Loss_at_Rated_Frequency_75_100': Stray_Loss_at_Rated_Frequency_75_100,
//   'Stray_Loss_at_Test_Frequency_75_50': Stray_Loss_at_Test_Frequency_75_50,
//   'Stray_Loss_at_Test_Frequency_75_100': Stray_Loss_at_Test_Frequency_75_100,
//   'Load_Loss_at_Rated_Frequency_75_50': Load_Loss_at_Rated_Frequency_75_50,
//   'Load_Loss_at_Rated_Frequency_75_100': Load_Loss_at_Rated_Frequency_75_100,
//   'Load_Loss_at_Test_Frequency_75_50': Load_Loss_at_Test_Frequency_75_50,
//   'Load_Loss_at_Test_Frequency_75_100': Load_Loss_at_Test_Frequency_75_100,
//   'V_Meas_From_Load_Loss_Test_50': V_Meas_From_Load_Loss_Test_50,
//   'V_Meas_From_Load_Loss_Test_100': V_Meas_From_Load_Loss_Test_100,
//   'Corr_Volt_V_50': Corr_Volt_V_50,
//   'Corr_Volt_V_100': Corr_Volt_V_100,
//   'Impedance_Z_At_AvgTemp_C_50': Impedance_Z_At_AvgTemp_C_50,
//   'Impedance_Z_At_AvgTemp_C_100': Impedance_Z_At_AvgTemp_C_100,
//   'Resistance_CorR_At_AvgTemp_C_50': Resistance_CorR_At_AvgTemp_C_50,
//   'Resistance_CorR_At_AvgTemp_C_100': Resistance_CorR_At_AvgTemp_C_100,
//   'Reactance_CorR_At_RefTemp_C_50': Reactance_CorR_At_RefTemp_C_50,
//   'Reactance_CorR_At_RefTemp_C_100': Reactance_CorR_At_RefTemp_C_100,
//   'Resistance_R_At_RefTemp_C_50': Resistance_R_At_RefTemp_C_50,
//   'Resistance_R_At_RefTemp_C_100': Resistance_R_At_RefTemp_C_100,
//   'final_Impedance_Z_At_RefTemp_C_50': final_Impedance_Z_At_RefTemp_C_50,
//   'final_Impedance_Z_At_RefTemp_C_100': final_Impedance_Z_At_RefTemp_C_100,
//   'Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_50': Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_50,
//   'Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_100': Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_100
// });


    } catch (error) {
      console.error('Error in calculate_loadloss_test:', error);
    }
	  
      this.total_load_50and100();
   
  }


}

