<template>
  <Header :name="loginStore.userInfo?.name"/>
  <main class="main">
    <table class="main__table">
      <thead>
      <tr class="main__table-row">
        <th>№</th>
        <th>Имя клиента</th>
        <th @click="sortTable('address')">Адрес</th>
        <th @click="sortTable('date')">Дата заказа</th>
        <th>Статус</th>
        <th>Комментарий</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event in sortedEvents" :key="event.id">
        <td> {{ event.id }}</td>
        <td> {{ event.name }}</td>
        <td> {{ event.address }}</td>
        <td> {{ event.date }}</td>
        <td> {{ event.status }}</td>
        <td> {{ event.comment }}</td>
        <div class="main__actions main__actions_table" v-if="loginStore.isAdmin">
          <Button @click="() => togglePopup('buttonTrigger')" size="small" without-text icon="trash-can"/>
          <Button v-if="event.status === 'Новый'" @click="eventStore.changeStatus(event.id)" size="small" width="20px"
                  without-text icon="check"/>
        </div>
        <Popup v-if="popupTriggers.buttonTrigger"
               :togglePopup="() => togglePopup('buttonTrigger')">
          <h2>Вы действительно хотите удалить заказ?</h2>
          <div class="main__actions">
            <Button @click="deleteEvent(event.id)" label="Ок"/>
            <Button @click="() => togglePopup('buttonTrigger')" label="Отмена"/>
          </div>
        </Popup>
      </tr>
      </tbody>

    </table>
  </main>

</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue'
import {useEventStore} from '@/stores/events.js'
import {useLoginStore} from "@/stores/login.js";
import Header from "@/components/Header.vue";
import Popup from "@/components/UI/Popup.vue";
import Button from "@/components/UI/Button.vue";

const eventStore = useEventStore()
const loginStore = useLoginStore()

// Popup
const popupTriggers = ref({
  buttonTrigger: false,
})

const togglePopup = (trigger: any) => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

// SORTING
const currentSort = ref('date')
const currentSortDir = ref('asc')

const sortTable = (sortKey: string) => {
  if (sortKey === currentSort.value) {
    currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc';
  }
  currentSort.value = sortKey;
}

const sortedEvents = computed(() => {
  return eventStore.events.sort((a: string, b: string) => {
    let modifier = 1;
    if (currentSortDir.value === 'desc') modifier = -1;
    if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier;
    if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier;
    return 0;
  })
})

const deleteEvent = async (id) => {
  await eventStore.deleteEvent(id);
  togglePopup('buttonTrigger');
}

onBeforeMount(() => {
  eventStore.getEvents()
})
</script>

<style lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15%;

  &__table {
    width: 80%;
    margin-bottom: 20px;
    border: 1px solid #dddddd;
    border-collapse: collapse;

    th {
      font-weight: bold;
      padding: 5px;
      background: #efefef;
      border: 1px solid #000;
    }

    td {
      border: 1px solid #000;
      padding: 5px;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 16px;

    &_table {
      margin-left: 16px;
      margin-top: 4px;
    }

  }
}
</style>
