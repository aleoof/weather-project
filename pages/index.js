import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import day from '../public/assets/day.jpg';
import rain from '../public/assets/rain.jpg';
import Spinner from './Spinner.jsx';

export default function Home() {
	const [weatherData, setWeatherData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getWeather();
	}, []);

	const getWeather = async () => {
		setLoading(true);
		try {
			await navigator.geolocation.getCurrentPosition(async (position) => {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=pt_br&units=metric&appid=26e99b35d5f77d402b5bafb1a85e1977`
				);
				setWeatherData(await getData(response));
				setLoading(false);
			});
		} catch (error) {
			console.error(error);
		} finally {
			return;
		}
	};

	const getData = async (response) => {
		return await response.json();
	};

	const setBackgroundCard = (status) => {
		switch (status) {
			case 'Clear':
				return day;
			case 'Rain':
				return rain;
			case 'Drizzle':
				return rain;
			case 'Thunderstorm':
				return rain;
			default:
				return day;
		}
	};

	return (
		<div>
			<Head>
				<title>Weather App</title>
			</Head>

			<main>
				<div className="container py-3" style={{ height: '100vh' }}>
					<div className="card d-flex h-100">
						<Image
							src={
								weatherData?.weather?.length > 0
									? setBackgroundCard(weatherData?.weather[0]?.main)
									: day
							}
							className="card-img"
							alt="day"
							layout="fill"
						/>
						<div className="card-img-overlay p-0 overflow-hidden">
							<div className="row h-100 mx-0">
								<div className="col-lg-8 col-md-12  d-flex pb-5 py-5">
									<span className="d-inline-flex align-items-center align-self-start m-5">
										<h1 style={{ fontSize: '60px', color: '#f4f4f4' }}>
											{loading ? (
												<Spinner style={{ width: '100px', height: '100px' }} />
											) : (
												<strong style={{ fontSize: '100px' }}>
													{Math.round(weatherData?.main?.temp)}
												</strong>
											)}
											&#8451; {loading ? '...' : weatherData.name}
										</h1>
									</span>
								</div>
								<div className="col-lg-4 col-md-12 d-flex flex-column justify-content-between weather__infos p-4">
									<span className="align-self-start w-100">
										<div className="d-grid">
											<button
												onClick={() => getWeather()}
												type="button"
												className="btn btn-outline-light"
												disabled={loading}
											>
												{loading ? <Spinner /> : 'Atualizar'}
											</button>
										</div>
									</span>
									<span className="d-flex w-100 flex-column align-self-end">
										<span className=" d-flex w-100 justify-content-between">
											<p>Sensação térmica: </p>
											<p>
												{' '}
												{loading ? (
													<Spinner />
												) : (
													Math.round(weatherData?.main?.feels_like)
												)}
												&#8451;{' '}
											</p>
										</span>
										<span className="d-flex w-100  justify-content-between">
											<p>Temperatura máxima: </p>
											<p>
												{loading ? (
													<Spinner />
												) : (
													Math.round(weatherData?.main?.temp_max)
												)}
												&#8451;{' '}
											</p>
										</span>
										<span className="d-flex w-100  justify-content-between">
											<p>Temperatura mínima: </p>
											<p>
												{loading ? (
													<Spinner />
												) : (
													Math.round(weatherData?.main?.temp_min)
												)}
												&#8451;{' '}
											</p>
										</span>
										<div className="d-flex w-100 justify-content-between">
											<p>Velocidade do vento:</p>
											{loading ? (
												<Spinner />
											) : (
												<span className="d-flex ">
													{weatherData?.wind?.speed}Km/h{' '}
													<p
														className="align-baseline"
														style={{
															transform: `rotate(${
																weatherData?.wind?.deg ?? 0
															}deg)`,
															transformOrigin: 'center center',
															marginLeft: '.5em',
														}}
													>
														<i className="bi bi-arrow-up-short"></i>
													</p>
												</span>
											)}
										</div>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
