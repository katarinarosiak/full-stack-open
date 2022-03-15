
const MainHeader = ({header}) => {
	return (
		<div>
			<h1>{header}</h1>
		</div>
	)
}

const Header = (props) => {
	return (
		<div>
			<h2>{props.course}</h2>
		</div>
	)
}

const Content = ({ parts } ) => {
	return (
		<div>
			{parts.map(part => {
				return <Part key={part.id} part={part}/>
			})}
			<Total parts={parts}/>
		</div>
	)
}

const Part = ({ part }) => {
	return (
		<div>
			<p>{part.name} {part.exercises}</p>
		</div>
	)
}

const Total = ( { parts } ) => {
	let total = parts.reduce((counter, obj) => {
		return counter + obj.exercises; 
	}, 0)

	return (
	<p>Number of exercises of{total}</p>
	)
}

const Course = ( {course} ) => {
	return (
		<div>
			<Header course = {course.name}/>
			<Content parts={course.parts}/>
		</div>
	)
}

const Courses = ({ courses }) => {
	return (
		<div>
			{courses.map(course => {
				return <Course key={course.id} course={course} />
			})}
		</div>
	)
}





export  {MainHeader, Courses};
