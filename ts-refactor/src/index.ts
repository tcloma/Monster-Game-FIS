import './styles/index.css'
import { select } from './utils/helpers'
import homePage from './pages/homePage'

const root = select<HTMLDivElement>('#root')
root!.append(homePage())
