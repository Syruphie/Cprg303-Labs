import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  FlatList, 
  Button, 
  StyleSheet, 
  TextInput, 
  Alert,
  TouchableOpacity 
} from 'react-native'
import { getUsers, createUser, updateUser, deleteUser, SampleData } from '../../lib/supabase_crud'

export default function Lab5Screen() {
  const [users, setUsers] = useState<SampleData[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      Alert.alert('Error', 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'Please enter a name')
      return
    }

    try {
      await createUser(newName.trim())
      setNewName('')
      fetchUsers()
      Alert.alert('Success', 'User created successfully')
    } catch (error) {
      console.error('Error creating user:', error)
      Alert.alert('Error', 'Failed to create user')
    }
  }

  const handleUpdate = async () => {
    if (!editingName.trim() || editingId === null) {
      Alert.alert('Error', 'Please enter a valid name')
      return
    }

    try {
      await updateUser(editingId, editingName.trim())
      setEditingId(null)
      setEditingName('')
      fetchUsers()
      Alert.alert('Success', 'User updated successfully')
    } catch (error) {
      console.error('Error updating user:', error)
      Alert.alert('Error', 'Failed to update user')
    }
  }

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(id)
              fetchUsers()
              Alert.alert('Success', 'User deleted successfully')
            } catch (error) {
              console.error('Error deleting user:', error)
              Alert.alert('Error', 'Failed to delete user')
            }
          }
        }
      ]
    )
  }

  const startEdit = (user: SampleData) => {
    setEditingId(user.id!)
    setEditingName(user.name)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingName('')
  }

  const renderUser = ({ item }: { item: SampleData }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userId}>ID: {item.id}</Text>
        <Text style={styles.userName}>Name: {item.name}</Text>
        <Text style={styles.userDate}>
          Created: {new Date(item.created_at!).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => startEdit(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => handleDelete(item.id!)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab 5: Data Fetching</Text>
      
      {/* Create Section */}
      <View style={styles.createSection}>
        <Text style={styles.sectionTitle}>Add New User</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={newName}
          onChangeText={setNewName}
        />
        <Button title="Create User" onPress={handleCreate} />
      </View>

      {/* Edit Section */}
      {editingId !== null && (
        <View style={styles.editSection}>
          <Text style={styles.sectionTitle}>Edit User</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new name"
            value={editingName}
            onChangeText={setEditingName}
          />
          <View style={styles.editButtons}>
            <Button title="Update" onPress={handleUpdate} />
            <Button title="Cancel" onPress={cancelEdit} color="gray" />
          </View>
        </View>
      )}

      {/* Users List */}
      <Text style={styles.sectionTitle}>Users ({users.length})</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id!.toString()}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchUsers}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  createSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  editSection: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  userInfo: {
    marginBottom: 10,
  },
  userId: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 2,
  },
  userDate: {
    fontSize: 12,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})