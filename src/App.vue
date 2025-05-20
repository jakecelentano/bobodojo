// App.vue
<template>
  <div class="app">
    <header>
      <h1>Bobo Dojo</h1>
      <p>Card creation & browsing</p>
    </header>
    
    <main>
      <div class="tabs">
        <button 
          :class="{ active: activeTab === 'create' }" 
          @click="activeTab = 'create'"
        >
          Create Card
        </button>
        <button 
          :class="{ active: activeTab === 'browse' }" 
          @click="activeTab = 'browse'"
        >
          Browse Cards ({{ cards.length }})
        </button>
      </div>
      
      <div v-if="activeTab === 'create'">
        <CardEntryForm @card-added="fetchCards" />
      </div>
      
      <div v-if="activeTab === 'browse'" class="browse-section">
        <div class="filters">
          <div class="filter-group">
            <label for="filter-type">Filter by Type:</label>
            <select id="filter-type" v-model="filters.cardType">
              <option value="">All Types</option>
              <option value="Monster">Monster</option>
              <option value="Spell">Spell</option>
              <option value="Trap">Trap</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="search">Search:</label>
            <input type="text" id="search" v-model="filters.search" placeholder="Card name or text...">
          </div>
          
          <div class="filter-group">
            <label for="sort-by">Sort By:</label>
            <select id="sort-by" v-model="sortBy">
              <option value="name">Name (A-Z)</option>
              <option value="-name">Name (Z-A)</option>
              <option value="created_at">Newest First</option>
              <option value="-created_at">Oldest First</option>
            </select>
          </div>
        </div>
        
        <div v-if="filteredCards.length > 0" class="card-grid">
          <div v-for="card in filteredCards" :key="card.id" class="card-preview-container">
            <CardRenderer 
              :card="card" 
              size="small" 
              @click="selectCard(card)"
            />
            <div class="card-preview-info">
              <h3 class="preview-card-name">{{ card.name }}</h3>
              <div class="card-type-badge" :class="card.card_type.toLowerCase()">
                {{ card.card_type }}
              </div>
              <p v-if="card.card_type === 'Monster'" class="card-stats">
                {{ card.attribute }} / Level {{ card.level }} / {{ card.monster_type }}
              </p>
              <p v-else-if="card.card_subtype" class="card-stats">
                {{ card.card_subtype }} {{ card.card_type }}
              </p>
            </div>
            <div class="card-preview-footer">
              <span>By: {{ card.created_by || 'Anonymous' }}</span>
              <span>{{ formatDate(card.created_at) }}</span>
            </div>
          </div>
        </div>
        
        <div v-else class="no-cards">
          <p>No cards found matching your filters.</p>
        </div>
      </div>
    </main>
    
    <!-- Card Detail Modal -->
    <div v-if="selectedCard" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ selectedCard.name }}</h2>
          <button @click="selectedCard = null" class="close-button">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="card-detail-container">
            <CardRenderer :card="selectedCard" size="large" />
          </div>
          
          <div class="card-meta">
            <div class="meta-item">
              <strong>Created by:</strong> {{ selectedCard.created_by || 'Anonymous' }}
            </div>
            <div class="meta-item">
              <strong>Created:</strong> {{ formatDate(selectedCard.created_at) }}
            </div>
            <div class="meta-item">
              <strong>Last Updated:</strong> {{ formatDate(selectedCard.updated_at) }}
            </div>
            <div class="meta-item" v-if="selectedCard.development_notes">
              <strong>Development Notes:</strong>
              <p>{{ selectedCard.development_notes }}</p>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="editCard(selectedCard)" class="edit-button">Edit Card</button>
          <button @click="deleteCard(selectedCard.id)" class="delete-button">Delete Card</button>
        </div>
      </div>
    </div>
    
    <!-- Edit Modal would go here (similar to the create form) -->
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import CardEntryForm from './components/CardEntryForm.vue';
import CardRenderer from './components/card/CardRenderer.vue';
import { supabase } from './supabase';

export default {
  name: 'App',
  components: {
    CardEntryForm,
    CardRenderer
  },
  setup() {
    const cards = ref([]);
    const activeTab = ref('create');
    const selectedCard = ref(null);
    const filters = reactive({
      cardType: '',
      search: ''
    });
    const sortBy = ref('created_at');
    
    const fetchCards = async () => {
      try {
        let query = supabase
          .from('cards')
          .select('*');
          
        // Handle sorting
        if (sortBy.value.startsWith('-')) {
          query = query.order(sortBy.value.substring(1), { ascending: false });
        } else {
          query = query.order(sortBy.value, { ascending: true });
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        cards.value = data || [];
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    
    const filteredCards = computed(() => {
      return cards.value.filter(card => {
        // Filter by card type
        if (filters.cardType && card.card_type !== filters.cardType) {
          return false;
        }
        
        // Filter by search term
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          return (
            card.name?.toLowerCase().includes(searchLower) ||
            card.description?.toLowerCase().includes(searchLower) ||
            card.effect_text?.toLowerCase().includes(searchLower)
          );
        }
        
        return true;
      });
    });
    
    const selectCard = (card) => {
      selectedCard.value = card;
    };
    
    const editCard = (card) => {
      // This would typically open an edit form modal or redirect
      console.log('Edit card:', card);
      alert('Edit functionality would open here');
      // In a full implementation, you'd have an edit form component
    };
    
    const deleteCard = async (id) => {
      if (confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
        try {
          const { error } = await supabase
            .from('cards')
            .delete()
            .eq('id', id);
            
          if (error) {
            throw error;
          }
          
          selectedCard.value = null;
          fetchCards();
        } catch (error) {
          console.error('Error deleting card:', error);
        }
      }
    };
    
    const formatDate = (dateString) => {
      if (!dateString) return 'Unknown';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };
    
    // Sample Blue-Eyes White Dragon card for displaying the legendary style
    const blueEyesCard = {
      id: 'blue-eyes-special',
      name: 'BLUE-EYES WHITE DRAGON',
      card_type: 'Monster',
      attribute: 'LIGHT',
      level: 8,
      monster_type: 'DRAGON',
      card_subtype: 'Normal',
      atk: '3000',
      def: '2500',
      description: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.',
      image_url: 'https://ms.yugipedia.com//8/8d/BlueEyesWhiteDragon-DPKB-EN-C-1E.png',
      card_code: 'RD/KP01-JP000',
      created_at: new Date().toISOString()
    };
    
    onMounted(() => {
      fetchCards();
    });
    
    return {
      cards,
      activeTab,
      selectedCard,
      filters,
      sortBy,
      filteredCards,
      fetchCards,
      selectCard,
      editCard,
      deleteCard,
      formatDate,
      blueEyesCard
    };
  }
};
</script>

<style>
/* Featured Card Section */
.featured-card-section {
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #fffdf7, #f0e6c8);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0d4a0;
}

.featured-card-section h2 {
  color: #b38728;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.featured-card-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.featured-card-description {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.featured-card-description h3 {
  color: #4a6baf;
  font-size: 1.5em;
  margin-bottom: 15px;
}

.featured-card-description p {
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Global styles */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 30px;
  text-align: center;
}

h1 {
  color: #4a6baf;
  margin-bottom: 10px;
}

header p {
  color: #666;
  font-size: 1.1em;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
}

.tabs button {
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
  color: #6c757d;
}

.tabs button.active {
  color: #4a6baf;
  border-bottom: 3px solid #4a6baf;
  margin-bottom: -2px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.filter-group label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
}

.filter-group input,
.filter-group select {
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.card-preview-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
}

.card-preview-info {
  width: 100%;
  padding: 10px;
  text-align: center;
}

.preview-card-name {
  margin: 8px 0;
  font-size: 1.1em;
}

.card-preview-header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

.card-preview-header h3 {
  margin: 0;
  font-size: 1.2em;
}

.card-type-badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: bold;
  color: white;
}

.card-type-badge.monster {
  background-color: #f8c146;
}

.card-type-badge.spell {
  background-color: #4aaf50;
}

.card-type-badge.trap {
  background-color: #d35a6d;
}

.card-preview-body {
  padding: 15px;
}

.card-stats {
  font-size: 0.9em;
  color: #6c757d;
  margin-bottom: 10px;
}

.card-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-preview-footer {
  padding: 10px 15px;
  background-color: #f8f9fa;
  font-size: 0.8em;
  color: #6c757d;
  display: flex;
  justify-content: space-between;
}

.no-cards {
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #4a6baf;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
}

.modal-body {
  padding: 20px;
}

.card-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.card-meta {
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  font-size: 0.9em;
  color: #6c757d;
}

.meta-item {
  margin-bottom: 10px;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.edit-button {
  padding: 8px 15px;
  background-color: #4a6baf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button {
  padding: 8px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
</style>