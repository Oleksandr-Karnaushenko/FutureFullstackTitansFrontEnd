
import Header from '../Header/Header'
import css from './SharedLayout.module.css'

// eslint-disable-next-line react/prop-types
export default function SharedLayout({children}) {
    return (
        <div className={css.container}>
            <Header />
            {children}
        </div>
    )
}