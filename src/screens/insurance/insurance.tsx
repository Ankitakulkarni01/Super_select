import React, { useCallback } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import { Colors } from '../../utils/color';
import GeneralForm from '../../../components/GeneralForm/generalForm';
import { InsuranceDataType } from '../../utils/formAPIs/insurance';


 


const InsuranceScreen = () => {

       // On Form Submit
       const onFormSubmit = useCallback(async (data: InsuranceDataType) => {
        const { doInsurance } = await import("../../utils/formAPIs/insurance");
    
        const res = await doInsurance(data);
        return res;
      }, []);
  
      
    return (
        <ScrollView style={{ backgroundColor: Colors.PURE_WHITE }}>
             <GeneralForm
              formName="insuranceForm"
              inputs={[
                { name: "name", type: "text", required: true },
                { name: "email", type: "email", required: true },
                {
                  name: "phone",
                  type: "tel",
                  placeholder: "Phone no",
                  required: true,
                },
              ]}
              onSubmit={onFormSubmit}
              withAcknowledgment
            />
        </ScrollView>
    );
};

export default InsuranceScreen;