import React from 'react'

const About: React.FC = () => {
	return (
		<div>
			<h2>Об программе</h2>
			<div style={{ textAlign: 'center', marginBottom: '1rem' }}>
				<p>Это программа создана для создания заметок</p>
				<p>и всяких прочих заданий, связанных с этим.</p>
				<p>
					<strong>Безопасность. Скорость. Синхронизация.</strong>
				</p>
			</div>
			<div style={{ height: '10vh' }}></div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '1rem',
					alignItems: 'center',
				}}
			>
				<img
					src='https://avatars.githubusercontent.com/u/130793948?v=4'
					alt='fiseyy'
					style={{
						width: '50px',
						height: '50px',
						borderRadius: '50%',
						marginRight: '1rem',
					}}
				/>
				<div className='av-fiseyy' style={{ marginRight: '4rem' }}>
					<strong>fiseyy</strong>
				</div>
				<img
					src='https://avatars.githubusercontent.com/u/119734607?v=4'
					alt='awfulfacekid'
					style={{
						width: '50px',
						height: '50px',
						borderRadius: '50%',
						marginRight: '1rem',
					}}
				/>
				<div className='av-awfulfacekid'>
					<strong>awfulfacekid</strong>
				</div>
			</div>
		</div>
	)
}

export default About
