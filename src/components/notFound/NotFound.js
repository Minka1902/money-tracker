import notFoundImage from '../../images/not-found.svg';

export default function NotFound() {
  	return (
  		<div className="not-found">
			<img className='not-found__image' src={notFoundImage} alt='404 NOT FOUND'/>
			<h2 className='not-found__title'>Nothing found</h2>
			<h3 className='not-found__subtitle'>Sorry, but nothing matched your search terms.</h3>
		</div>
  	);
}
