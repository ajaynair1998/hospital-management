import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";
import ChiefComplaints from "./ChiefComplaints";
import ClinicalDiagnosis from "./ClinicalDiagnosis";
import GeneralExamination from "./GeneralExamination";
import PastMedicalHistory from "./PastMedicalHistory";
import PastSurgicalHistory from "./PastSurgicalHistory";

export const FunctionalitySwitch = (): JSX.Element => {
	const { data } = useSelector((state: IStore) => state.categoriesStore);
	switch (data.location) {
		case "chief_complaint":
			return <ChiefComplaints />;
		case "clinical_diagnosis":
			return <ClinicalDiagnosis />;
		case "diagnosis":
			return <React.Fragment />;
		case "drug_allergy":
			return <React.Fragment />;
		case "general_examination":
			return <GeneralExamination />;
		case "investigation":
			return <React.Fragment />;
		case "local_examination":
			return <React.Fragment />;
		case "medicine":
			return <React.Fragment />;
		case "past_medical_history":
			return <PastMedicalHistory />;
		case "treatment_plan":
			return <React.Fragment />;
		case "follow_up":
			return <React.Fragment />;
		case "past_surgical_history":
			return <PastSurgicalHistory />;
		default:
			return <ChiefComplaints />;
	}
};