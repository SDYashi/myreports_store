import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-generate-reports',
  templateUrl: './store-generate-reports.component.html',
  styleUrls: ['./store-generate-reports.component.css']
})
export class StoreGenerateReportsComponent {


  testReport = {
    sample_code: '',
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
    voltage_nl: '',
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
    remark_5: ''
  };

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
      this.step = 1;
      console.log('Form Submitted:', this.testReport);
      // Add your submission logic here
    } else {
      console.log('Form is invalid');
    }
  }

  calculateHV() {
    if (this.testReport.hv_kv && this.testReport.job_rating) {
      this.testReport.hv = String(Number(this.testReport.hv_kv) * Number(this.testReport.job_rating));
    }
  }
  calculateLV() {
    if (this.testReport.lv_v && this.testReport.job_rating) {
      this.testReport.lv = String(Number(this.testReport.lv_v) * Number(this.testReport.job_rating));
    }
  }

  calculateAvgResist() {
    const r1 = Number(this.testReport.resist_1);
    const r2 = Number(this.testReport.resist_2);
    const r3 = Number(this.testReport.resist_3);
    if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
      this.testReport.avg_resist = String((r1 + r2 + r3) / 3);
    }
  }
  calculatePhaseResist1() {
    const avgResist = Number(this.testReport.avg_resist);
    const avgTempHV = Number(this.testReport.avg_temp_hv);
    if (!isNaN(avgResist) && !isNaN(avgTempHV)) {
      this.testReport.phase_resist_hv = String(avgResist * ((225 + 75) / (225 + avgTempHV)));
    }
  }

  calculateAvgResistLv() {
    const r1 = Number(this.testReport.resist_lv_1);
    const r2 = Number(this.testReport.resist_lv_2);
    const r3 = Number(this.testReport.resist_lv_3);
    if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
      this.testReport.avg_resist_lv = String((r1 + r2 + r3) / 3);
    }
  }
  calculatePhaseResistLv2() {
    const avgResistLv = Number(this.testReport.avg_resist_lv);
    const avgTempLV = Number(this.testReport.avg_temp_lv);
    if (!isNaN(avgResistLv) && !isNaN(avgTempLV)) {
      this.testReport.phase_resist_lv = String(avgResistLv * ((225 + 75) / (225 + avgTempLV)));
    }
  }

  calculatenoload_testPCW() {
    const voltageNL = Number(this.testReport.voltage_nl);
    const pmNL = Number(this.testReport.pm_nl);
    if (!isNaN(voltageNL) && !isNaN(pmNL)) {
      this.testReport.pc_nl = String(Math.sqrt(voltageNL ** 2 + pmNL ** 2));
    }
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

      if (
        [jobRatingNum, hvKV, lvV, avgResist, avgResistLv, avgTempHV, temp50, freq50, curr50, pm50, temp100, freq100, curr100, pm100].some(isNaN)
      ) {
        console.warn('Some input values are invalid numbers.');
        return;
      }

      // Rated currents
      const Rated_Current_HV_50 = hvKV / (jobRatingNum * 1.732);
      const Rated_Current_LV_50 = lvV / (jobRatingNum * 1.732);
      const Rated_Current_HV_100 = hvKV / (jobRatingNum * 1.732);
      const Rated_Current_LV_100 = lvV / (jobRatingNum * 1.732);

      // Average resistance LV Ohm at 50 and 100
      const Cal_Avg_Resistance_LV_Ohm_50 = (avgResistLv / 1000) / 2;
      const Cal_Avg_Resistance_LV_Ohm_100 = (avgResistLv / 1000) / 2;

      // I^2 R losses (using multiplication and exponentiation correctly)
      const I2_R_hv_50 = 3 * Math.pow(Rated_Current_HV_50 / 1.732, 2) * avgResist * 1.5;
      const I2_R_hv_100 = 3 * Math.pow(Rated_Current_HV_100 / 1.732, 2) * avgResist * 1.5;
      const I2_R_lv_50 = 3 * Math.pow(Rated_Current_LV_50 / 1.732, 2) * avgResistLv * 1.5;
      const I2_R_lv_100 = 3 * Math.pow(Rated_Current_LV_100 / 1.732, 2) * avgResistLv * 1.5;

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

      const Corr_Volt_V_50 = V_Meas_From_Load_Loss_Test_50 * (curr50 / Rated_Current_HV_50);
      const Corr_Volt_V_100 = V_Meas_From_Load_Loss_Test_100 * (curr100 / Rated_Current_HV_100);

      const Impedance_Z_At_AvgTemp_C_50 = (Corr_Volt_V_50 / 1000) / Number(this.testReport.vector_group || 1);
      const Impedance_Z_At_AvgTemp_C_100 = (Corr_Volt_V_100 / 1000) / Number(this.testReport.vector_group || 1);

      const Resistance_CorR_At_AvgTemp_C_50 = Corrected_Load_Loss_LLC_50 / (jobRatingNum * 1000) * 100;
      const Resistance_CorR_At_AvgTemp_C_100 = Corrected_Load_Loss_LLC_100 / (jobRatingNum * 1000) * 100;

      const Reactance_CorR_At_AvgTemp_C_50 = Math.sqrt(
        Math.pow(Impedance_Z_At_AvgTemp_C_50, 2) - Math.pow(Resistance_CorR_At_AvgTemp_C_50, 2)
      );
      const Reactance_CorR_At_AvgTemp_C_100 = Math.sqrt(
        Math.pow(Impedance_Z_At_AvgTemp_C_100, 2) - Math.pow(Resistance_CorR_At_AvgTemp_C_100, 2)
      );

      const Resistance_R_At_AvgTemp_C_50 = Stray_Loss_At_AvgTemp_50 / (jobRatingNum * 1000) * 100;
      const Resistance_R_At_AvgTemp_C_100 = Stray_Loss_At_AvgTemp_100 / (jobRatingNum * 1000) * 100;

      const final_Impedance_Z_At_AvgTemp_C_50 = Math.sqrt(
        Math.pow(Reactance_CorR_At_AvgTemp_C_50, 2) - Math.pow(Resistance_R_At_AvgTemp_C_50, 2)
      );
      const final_Impedance_Z_At_AvgTemp_C_100 = Math.sqrt(
        Math.pow(Reactance_CorR_At_AvgTemp_C_100, 2) - Math.pow(Resistance_R_At_AvgTemp_C_100, 2)
      );

      const Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_50 =
        (Rated_Frequency / freq50) * final_Impedance_Z_At_AvgTemp_C_50;
      const Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_100 =
        (Rated_Frequency / freq100) * final_Impedance_Z_At_AvgTemp_C_100;

      this.testReport.percent_z_50 = Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_50.toFixed(2);
      this.testReport.percent_z_100 = Impedance_ZAt_RefTemp_C_At_TestFreq_RefFreqHz_100.toFixed(2);

      this.total_load_50and100();
    } catch (error) {
      console.error('Error in calculate_loadloss_test:', error);
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
      if (percentZ100 > 4.05 && percentZ100 < 4.95) { // 4.5 ± 10%
        this.testReport.remark_1 = "Complied";
      } else {
        this.testReport.remark_1 = "Not Complied";
      }
    }

    if (!isNaN(obtained2)) {
      this.testReport.remark_2 = obtained2 < 218.5 ? "Complied" : "Not Complied";
    }

    if (!isNaN(obtained3)) {
      this.testReport.remark_3 = obtained3 < 730.25 ? "Complied" : "Not Complied";
    }
  }

  getsamplecodelist() {
    this.storeServices.getsamplecode().subscribe({
      next: (data) => {
        this.testReport.sample_code = data;
      },
      error: (err) => {
        this.testReport.sample_code = err;
        console.log(err);
      }
    });
  }

}

