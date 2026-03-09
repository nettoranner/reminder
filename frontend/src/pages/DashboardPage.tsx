import { Navigation } from '../components/Navigation'
import { Header } from '../components/Header'
import { ExpenseChart } from '../components/ExpenseChart'
import { CategoryChart } from '../components/CategoryChart'
import { TaskList } from '../components/TaskList'
import { RecentExpenses } from '../components/RecentExpenses'
import { RemainingFunds } from '../components/RemainingFunds'

export const DashboardPage = () => {
  

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <Navigation />
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <Header />
        
        <main style={{
          flex: 1,
          overflowY: 'auto'
        }}>
          <div style={{
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '24px',
            gridAutoRows: 'max-content'
          }}>
            {/* Row 1: Expense Chart (spans 2 cols) and Remaining Funds */}
            <div style={{ gridColumn: 'span 2' }}>
              <ExpenseChart />
            </div>
            <div>
              <RemainingFunds />
            </div>

            {/* Row 2: Category Chart and Task List */}
            <div>
              <CategoryChart />
            </div>
            <div>
              <TaskList />
            </div>

            {/* Row 3: Recent Expenses (spans all 3 cols) */}
            <div style={{ gridColumn: 'span 3' }}>
              <RecentExpenses />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}