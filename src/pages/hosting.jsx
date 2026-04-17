import Questionnaire from '../components/Questionnaire'

const BLOCKS = [
  // ... вставь BLOCKS из questionnaire_v2.jsx
]

const CRITICAL_IDS = ["2.3", "2.4", "4.1", "5.1", "5.3"]

export default function Hosting() {
  return (
    <Questionnaire
      title="Хостинг-платформа с автодеплоем"
      blocks={BLOCKS}
      criticalIds={CRITICAL_IDS}
      dbPath="hosting"
    />
  )
}
