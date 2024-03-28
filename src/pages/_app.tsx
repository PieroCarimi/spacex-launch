import { ContextProvider } from '@/ContextProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { TContext } from '@/declarations';
import '@/styles/globals.css';
import axios from 'axios';
import type { AppProps } from 'next/app';

export default function App(
	{ Component, pageProps }: AppProps,
	initialLaunches: TContext['launches'],
) {
	return (
		<ContextProvider initialLaunches={initialLaunches}>
			<div className="flex flex-col min-h-screen">
      			<Navbar/>
				<main className="flex-grow">
					<Component {...pageProps} />
				</main>
      			<Footer/>
			</div>
		</ContextProvider>
	);
}

export async function getServerSideProps() {
	const res = await axios.get('/api/launches');
	const initialLaunches = res.data.length > 0 ? res.data : [];

	return { props: { initialLaunches } };
}
