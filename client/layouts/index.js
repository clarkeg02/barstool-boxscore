import Header from 'components/header';
import Footer from 'components/footer';

export default function Layout({ stylesheets, scripts, children }) {

    return [
        <Header key="header" stylesheets={stylesheets} />,
        children,
        <Footer key="footer" scripts={scripts} />
    ]
}