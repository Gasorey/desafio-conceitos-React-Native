import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    })
  } , []);

  async function handleAddRepository(){
    const response = await api.post('repositories',{
      title: `Novo Projeto${Date.now()}`,
      url: 'https://github.com/Gasorey/desafio-conceitos-React-Native',
      owner:'Gabriel Asorey',
      techs:['Node.JS','React-Native']
    });
    const repository = response.data
    setRepositories([...repositories, repository])
  }


  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
   const response =  await api.post(`repositories/${id}/like`)
   
  const likedRepository = response.data;
    console.log()
   const newRepository = repositories.map(repository=> {
     if (repository.id === id) {
      return likedRepository;
     }else{
       return repository;
     }
    });
    setRepositories(newRepository)
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container1}>
      <FlatList 
        style={styles.repositoryContainer1}
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({ item: repository }) => (
          <>
            <Text style={styles.repoTitle}>{repository.title}</Text>
            <View style={styles.techsContainer}>
            {repository.techs.map(tech =>(
            <Text style={styles.tech} key={tech}>
            {tech}
            </Text>))}
           
            </View>
            <View style={styles.likesContainer}>
              <Text
               style={styles.likeText}
               testID={`repository-likes-${repository.id}`}
            >{repository.likes} curtida{repository.likes > 1 ? 's': ''}</Text>
            </View>

            <TouchableOpacity 
            style={styles.button}
            onPress={()=>handleLikeRepository(repository.id)}
            testID={`like-button-${repository.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </>
          )}
      />
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer2}>
          <TouchableOpacity
          style={styles.button}
          onPress={handleAddRepository}
          
          
          
          >
            <Text style={styles.addText}>Adicionar novo projeto</Text>
          </TouchableOpacity> 
        </View> 
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {   
   flex:0, 
    backgroundColor: "#7159c1",
    
  },
  repoTitle:{
    fontSize:22,
    fontWeight: 'bold',
  },
  repositoryContainer1: {
    flex:0,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 25,
  },
  repositoryContainer2: {
    flex:1/2,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    marginTop:600,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent:'center',
  

  },
  addText:{
    fontWeight: 'bold',
    fontSize: 24,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
})
