import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import axios from "axios";

@Module
export default class Chat extends VuexModule {
  conversations: Array<Object> = [
    {
      id: new Date(2018,11,28).getTime(),
      unread: false,
      title: "The Group",
      styles: {
        color: "default",
        density: "medium"
      },
      notifications: {
        state: true
      },
      created: new Date(2018,11,28),
      creator: "test",
      members: [
        {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
        {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
        {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"}
      ],
      messages: [
        { author: "test2", body: "This is a message from another user", timestamp: new Date(2018,11,28) },
        { author: "test", body: "This is a message you sent", timestamp: new Date(2019,2,22) },
        { author: "test2", body: "Another message from another user", timestamp: new Date(2019,3,20) },
        { author: "test", body: "Another from you", timestamp: new Date() }
      ]
    },
    {
      id: new Date(2019,4,3).getTime(),
      unread: true,
      title: "",
      styles: {
        color: "default",
        density: "medium"
      },
      notifications: {
        state: true
      },
      created: new Date(2019,4,3),
      creator: "test",
      members: [
        {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
        {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}
      ],
      messages: [
        { author: "test", body: "Hey, whats up?", timestamp: new Date(2019,4,3) }
      ]
    },
    {
      id: new Date(2019,3,3).getTime(),
      unread: false,
      title: "",
      styles: {
        color: "default",
        density: "medium"
      },
      notifications: {
        state: true
      },
      created: new Date(2019,3,3),
      creator: "test3",
      members: [
        {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
        {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}
      ],
      messages: [
        { author: "test3", body: "Hola amigo", timestamp: new Date(2019,4,3) }
      ]
    }
  ]
  contacts: Array<Object> = [
    {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
    {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"},
    {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"},
    {username: "test4", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"},
    {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"}
  ]

  @Mutation set_contacts(contacts: Array<Object>){
    this.contacts = contacts;
  }

  @Action({ commit: 'set_contacts' }) load_contacts() { return []; }

  get getContacts() { return this.contacts }

  get getContact() {
    return (username: String) => {
      return this.contacts.find(c => c.username === username);
    };
  }

  @Mutation set_conversations(conversations: Array<Object>){
    this.conversations = conversations;
  }
  @Mutation new_conversation(conversation: Object){
    this.conversations.unshift(conversation);
  }
  @Mutation set_convo_prop(data: Object){
    let index: number = this.conversations.findIndex(c => data.id === c.id);
    this.conversations[index][data.property] = data.value;
  }
  @Mutation delete_conversation(id: Number){
    let index = this.conversations.findIndex(c => id === c.id);
    this.conversations.splice(index, 1);
  }
  @Mutation new_message(data: Object){
    let index = this.conversations.findIndex(c => data.id === c.id);
    this.conversations[index].messages.push(data.message);
    let newest = this.conversations.splice(index, 1);
    this.conversations.unshift(newest[0]);
  }

  @Action({ commit: 'set_conversations' }) load_conversations() { return [] }
  @Action({ commit: 'new_message' }) SOCKET_message(data: Object) { return data }
  @Action({ commit: 'set_convo_prop' }) SOCKET_conversation_updated(data: Object) { return data }
  @Action({ commit: 'new_conversation' }) SOCKET_new_conversation(data: Object) { return data }

  get getConversations() { return this.conversations }

  get getConversation() {
    return (id: Number) => {
      return this.conversations.find(c => c.id === id)
    };
  }
}
