import { useState } from "react";


function Button( { handleClick,text }) {
	return (
		<div>
			<button onClick={handleClick}>
				{text}
			</button>
		</div>
	)
}

const Statistics = (props) => {
	const {good, neutral, bad, all, average, positive} = props;

	if (all > 0) {
		return (
			<div>
				<h1>Statistics</h1>
				<table>
					<tbody>
						<StatisticLine text='good' value={good}/>
						<StatisticLine text='bad' value={bad}/>
						<StatisticLine text='neutral' value={neutral}/>
						<StatisticLine text='all' value={all}/>
						<StatisticLine text='average' value={average}/>
						<StatisticLine text='positive' value={positive}/>
					</tbody>
				</table>
			</div>
		)
	}
	return (
		<div>
			<h1>Statistics</h1>
			<p>No feedback given</p>
		</div>
	)
}

const StatisticLine = ({ text, value}) => {
	return (
		<tr>
			<th>{text}</th>
			<th>{value}</th>
		</tr>
	)
}

function App() {
	const [good, incrementGood] = useState(0)
	const [neutral, incrementNeutral] = useState(0)
	const [bad, incrementBad] = useState(0)
	const [average, countAverage] = useState(0)
	const [all, countAll] = useState(0)
	const [positive, countPositive] = useState(0)

	const positivePercent = () => good/all*100;

	const handleGood = () => {
		incrementGood(good + 1)
		countAll(all + 1)
		countAverage(all/3)
		countPositive(positivePercent())
	}

	const handleNautral = () => {
		incrementNeutral(neutral + 1)
		countAll(all + 1)
		countAverage(all/3)
		countPositive(positivePercent())
	}

	const handleBad = () => {
		incrementBad(bad + 1)
		countAll(all + 1)
		countAverage(all/3)
		countPositive(positivePercent())
	}


  return (
		<div>
			<h1>Give Feedback</h1>
			<Button handleClick={handleGood} text='good'/>
			<Button handleClick={handleNautral} text='neutral'/>
			<Button handleClick={handleBad}  text='bad'/>
			<Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
		</div>
  );
}

export default App;
