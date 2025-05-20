<template>
  <div class="card-form">
    <h2>Create New Game Card</h2>
    <form @submit.prevent="submitCard">
      <!-- Basic Card Info -->
      <div class="form-group">
        <label for="name">Card Name*</label>
        <input type="text" id="name" v-model="card.name" required>
      </div>
      
      <div class="form-group">
        <label for="card_type">Card Type*</label>
        <select id="card_type" v-model="card.card_type" required @change="resetTypeSpecificFields">
          <option value="Monster">Monster</option>
          <option value="Spell">Spell</option>
          <option value="Trap">Trap</option>
        </select>
      </div>
      
      <!-- Card type adjustment -->
      <div class="form-group">
        <label for="isLegendary">Legendary Card</label>
        <div class="checkbox-container">
          <input type="checkbox" id="isLegendary" v-model="card.isLegendary">
          <span class="checkbox-label">Mark as legendary card (special gold border styling)</span>
        </div>
      </div>
      
      <!-- Card Code Field for Legendary Cards -->
      <div class="form-group" v-if="card.isLegendary">
        <label for="card_code">Card Code (for legendary cards)</label>
        <input type="text" id="card_code" v-model="card.card_code" placeholder="e.g., RD/KP01-JP000">
      </div>
      
      <!-- Monster Card Fields (conditionally shown) -->
      <div v-if="card.card_type === 'Monster'">
        <div class="form-group">
          <label for="attribute">Attribute</label>
          <select id="attribute" v-model="card.attribute">
            <option value="DARK">DARK</option>
            <option value="LIGHT">LIGHT</option>
            <option value="EARTH">EARTH</option>
            <option value="WATER">WATER</option>
            <option value="FIRE">FIRE</option>
            <option value="WIND">WIND</option>
            <option value="DIVINE">DIVINE</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="level">Level/Rank</label>
          <input type="number" id="level" v-model="card.level" min="1" max="12">
        </div>
        
        <div class="form-group">
          <label for="monster_type">Creature Type</label>
          <select id="monster_type" v-model="card.monster_type">
            <option value="Hyrdro Kin">Hyrdro Kin</option>
            <option value="Cyber Lord">Cyber Lord</option>
            <option value="Cyber Virus">Cyber Virus</option>
            <option value="Trench Hunter">Trench Hunter</option>
            <option value="Leviathon">Leviathon</option>
            <option value="Titan">Titan</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        
        <div class="form-group" v-if="card.monster_type === 'Custom'">
          <label for="custom_monster_type">Custom Monster Type</label>
          <input type="text" id="custom_monster_type" v-model="card.custom_monster_type">
        </div>
        
        <div class="form-group">
          <label for="card_subtype">Card Subtype</label>
          <select id="card_subtype" v-model="card.card_subtype">
            <option value="Normal">Normal</option>
            <option value="Effect">Effect</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        
        <div class="form-group" v-if="card.card_subtype === 'Custom'">
          <label for="custom_subtype">Custom Subtype</label>
          <input type="text" id="custom_subtype" v-model="card.custom_subtype">
        </div>
        
        <div class="form-group">
          <label for="atk">ATK</label>
          <input type="number" id="atk" v-model="card.atk" min="0">
        </div>
        
        <div class="form-group">
          <label for="def">DEF</label>
          <input type="number" id="def" v-model="card.def" min="0">
        </div>
      </div>
      
      <!-- Spell Card Fields (conditionally shown) -->
      <div v-if="card.card_type === 'Spell'">
        <div class="form-group">
          <label for="spell_subtype">Spell Type</label>
          <select id="spell_subtype" v-model="card.card_subtype">
            <option value="Normal">Normal</option>
            <option value="Quick-Play">Quick-Play</option>
            <option value="Continuous">Continuous</option>
            <option value="Ritual">Ritual</option>
            <option value="Equip">Equip</option>
            <option value="Field">Field</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        
        <div class="form-group" v-if="card.card_subtype === 'Custom'">
          <label for="custom_subtype">Custom Spell Type</label>
          <input type="text" id="custom_subtype" v-model="card.custom_subtype">
        </div>
      </div>
      
      <!-- Trap Card Fields (conditionally shown) -->
      <div v-if="card.card_type === 'Trap'">
        <div class="form-group">
          <label for="trap_subtype">Trap Type</label>
          <select id="trap_subtype" v-model="card.card_subtype">
            <option value="Normal">Normal</option>
            <option value="Continuous">Continuous</option>
            <option value="Counter">Counter</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        
        <div class="form-group" v-if="card.card_subtype === 'Custom'">
          <label for="custom_subtype">Custom Trap Type</label>
          <input type="text" id="custom_subtype" v-model="card.custom_subtype">
        </div>
      </div>
      
      <!-- Common Fields for All Cards -->
      <div class="form-group">
        <label for="description">Card Description* (Lore/Flavor text)</label>
        <textarea id="description" v-model="card.description" required></textarea>
      </div>
      
      <div class="form-group">
        <label for="effect_text">Effect Text (Game Mechanics)</label>
        <textarea id="effect_text" v-model="card.effect_text" placeholder="Describe exactly how this card functions in the game..."></textarea>
      </div>
      
      <div class="form-group">
        <label for="development_notes">Development Notes (Ideas for improvement, balance, etc.)</label>
        <textarea id="development_notes" v-model="card.development_notes" placeholder="Notes about balancing, future improvements, etc..."></textarea>
      </div>
      
      <div class="form-group">
        <label for="image_url">Image URL (optional)</label>
        <input type="text" id="image_url" v-model="card.image_url" :placeholder="imagePlaceholder">
        <div class="image-helpers">
          <button type="button" @click="useLocalSample" class="helper-button">
            Use sample.png
          </button>
          <small class="helper-text">
            For local files: Use '@/assets/filename.png' or import them
          </small>
        </div>
      </div>
      
      <div class="form-group">
        <label for="created_by">Created By</label>
        <input type="text" id="created_by" v-model="card.created_by">
      </div>
      
      <div class="form-actions">
        <button type="submit">Save Card</button>
        <button type="button" @click="resetForm">Clear Form</button>
      </div>
    </form>
    
    <div class="status-message" v-if="statusMessage">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase';
import sampleImage from '@/assets/sample.png';

export default {
  name: 'CardEntryForm',
  data() {
    return {
      card: this.getEmptyCardObject(),
      statusMessage: '',
      imagePlaceholder: 'Enter URL or use local image'
    }
  },
  computed: {
    sampleImagePath() {
      return sampleImage;
    }
  },
  methods: {
    useLocalSample() {
      this.card.image_url = sampleImage;
      this.statusMessage = 'Using local sample.png image';
      setTimeout(() => {
        this.statusMessage = '';
      }, 2000);
    },
    async submitCard() {
      try {
        // Handle custom type fields
        if (this.card.monster_type === 'Custom' && this.card.custom_monster_type) {
          this.card.monster_type = this.card.custom_monster_type;
        }
        
        if (this.card.card_subtype === 'Custom' && this.card.custom_subtype) {
          this.card.card_subtype = this.card.custom_subtype;
        }
        
        // Create a clean object for submission (remove helper fields)
        const cardToSubmit = { ...this.card };
        delete cardToSubmit.custom_monster_type;
        delete cardToSubmit.custom_subtype;
        
        // Add timestamp for updated_at
        cardToSubmit.updated_at = new Date().toISOString();
        
        const { data, error } = await supabase
          .from('cards')
          .insert([cardToSubmit]);
        
        if (error) {
          throw error;
        }
        
        this.statusMessage = `Card "${this.card.name}" has been added successfully!`;
        this.resetForm();
        
        // Emit event for parent component
        this.$emit('card-added');
      } catch (error) {
        console.error('Error saving card:', error);
        this.statusMessage = `Error: ${error.message}`;
      }
    },
    
    resetTypeSpecificFields() {
      // Reset type-specific fields when card type changes
      if (this.card.card_type !== 'Monster') {
        this.card.attribute = null;
        this.card.level = null;
        this.card.monster_type = null;
        this.card.custom_monster_type = null;
        this.card.atk = null;
        this.card.def = null;
      }
      
      // Reset subtype based on the new card type
      this.card.card_subtype = null;
      this.card.custom_subtype = null;
    },
    
    resetForm() {
      this.card = this.getEmptyCardObject();
      // Clear status after a delay
      setTimeout(() => {
        this.statusMessage = '';
      }, 3000);
    },
    
    getEmptyCardObject() {
      return {
        name: '',
        card_type: 'Monster',
        isLegendary: false,
        attribute: 'DARK',
        level: 4,
        monster_type: 'Spellcaster',
        custom_monster_type: '',
        card_subtype: 'Normal',
        custom_subtype: '',
        atk: 1000,
        def: 1000,
        description: '',
        effect_text: '',
        development_notes: '',
        image_url: '',
        created_by: '',
        card_code: ''
      };
    }
  }
}
</script>

<style scoped>
.card-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
}

.form-actions {
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  background-color: #4a6baf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button[type="button"] {
  background-color: #6c757d;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
}

.checkbox-label {
  font-weight: normal;
}

.status-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.image-helpers {
  margin-top: 8px;
}

.helper-button {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.helper-button:hover {
  background-color: #5a6268;
}

.helper-text {
  display: block;
  margin-top: 5px;
  color: #666;
  font-size: 12px;
}
</style>
