import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	IDrugAllergy,
	IPastMedicalHistory,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint, ITreatmentPlan } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setDrugAllergies,
	setPastMedicalHistory,
	setTreatmentPlan,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import SelectedArray from "../SelectedArray";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	histories: string[];
	id?: number;
	handleSelectPastMedicalHistory: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const PastMedicalHistoryDataEntries = () => {
	const [selectedHistory, setSelectedHistory] = React.useState(null);
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const past_medical_histories = useSelector(
		(state: IStore) =>
			state.patientTreatmentDetailsDataStore.past_medical_history
	);
	let dispatch = useDispatch();
	const fetchAllExistingPastMedicalHistory = async () => {
		let response = await window.electron.PastMedicalHistoryApi.get({
			treatmentDetailId: 1,
		});
		console.log(
			"🚀 ~ file: index.tsx ~ line 52 ~ fetchAllExistingPastMedicalHistory ~ response",
			response
		);
		if (response.status === 200) {
			dispatch(setPastMedicalHistory(response.data));
		}
	};
	let handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.PastMedicalHistoryApi.delete({
				id: selectedHistory,
			});
			setDialogOpen(false);
			await fetchAllExistingPastMedicalHistory();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingPastMedicalHistory();
	}, []);
	return (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="h5" component="div">
							Data Entries
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{past_medical_histories &&
					past_medical_histories.map((item: IPastMedicalHistory) => {
						return (
							<DrugAllergyDataEntry
								createdAt={item.createdAt}
								histories={item.history}
								id={item.id}
								key={item.id}
								handleSelectPastMedicalHistory={setSelectedHistory}
								openDialog={setDialogOpen}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove these allergies ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
};

export function DrugAllergyDataEntry({
	createdAt,
	histories,
	id,
	handleSelectPastMedicalHistory,
	openDialog,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [drugAllergy, setDrugAllergy] = React.useState<any>("");
	const [durationValue, setDuration] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setDrugAllergy(histories);
	}, []);

	let handleRemoveButton = async () => {
		try {
			handleSelectPastMedicalHistory(id);
			openDialog(true);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	return (
		<Paper
			key={id}
			elevation={2}
			sx={{
				p: 2,
				mb: 2,

				// margin: 2,
				// maxWidth: 500,
				flexGrow: 1,
				backgroundColor: (theme) =>
					theme.palette.mode === "dark" ? "#1A2027" : "#fff",
			}}
		>
			<Grid container spacing={2}>
				{/* <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid> */}
				<Grid item xs={12} sm container>
					<Grid item xs container direction="column" spacing={2}>
						<Grid
							item
							xs
							sx={{
								m: 0,
							}}
						>
							<Typography
								gutterBottom
								variant="subtitle1"
								component="div"
								sx={{ color: "#fff" }}
							>
								'TEMPLATE DATA FOR GUTTER'
							</Typography>
							<Typography variant="body2" color="text.secondary" gutterBottom>
								{durationValue}
							</Typography>
							{/* <Typography variant="body2" gutterBottom>
								{detailValue}
							</Typography> */}
							<React.Fragment>
								<Grid item xs direction="row" gap={2} container>
									{histories.length > 0 ? (
										histories.map((item: string) => {
											return (
												<Button
													variant="contained"
													sx={{
														background: "#d81159",
													}}
												>
													{item}
												</Button>
											);
										})
									) : (
										<React.Fragment />
									)}
								</Grid>
							</React.Fragment>
						</Grid>
						<Grid item xs container direction="row" spacing={2}>
							<Grid item>
								<Button sx={{ color: "#ea2929" }} onClick={handleRemoveButton}>
									Remove
								</Button>
							</Grid>
							<Grid item>
								<Button>Edit</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant="subtitle1" component="div" sx={{ m: 1 }}>
							{created_at_readable_format}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default PastMedicalHistoryDataEntries;
