import React, { useEffect } from "react";
import { IStore } from "../../helpers/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/Reducers/userDataReducer";

const ReduxTest: React.FC = () => {
	const { data } = useSelector((state: IStore) => state.userDataStore);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<div>
			<div>
				ReduxTest
				{JSON.stringify(data)}
			</div>
			<button
				onClick={() =>
					dispatch(setSelectedUser({ name: `ajay + ${Date.now()}` }))
				}
			>
				add
			</button>
		</div>
	);
};

export default ReduxTest;
