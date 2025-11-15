import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api'
      const response = await axios.get(`${apiUrl}/user/all`)
      if (response.data.success) {
        setUsers(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-4xl text-muted-foreground mb-4">👥</div>
            <p className="text-sm text-muted-foreground">
              No users registered yet. Be the first to register!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Total Users: {users.length}
        </CardTitle>
        <CardDescription>
          All registered users in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{user.username}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Age: {user.age}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span>{user.phone}</span>
                    </div>
                    {user.createdAt && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Registered:</span>
                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default UsersList
