<template>
  <div class="reading-note-share">
    <h1 class="title">读书笔记分享工具</h1>
    <div class="form-container">
      <div class="form-group">
        <label for="bookName">书籍名称</label>
        <input id="bookName" v-model="bookName" placeholder="请输入书籍名称" />
      </div>
      
      <div class="form-group">
        <label for="authorName">作者名称</label>
        <input id="authorName" v-model="authorName" placeholder="请输入作者名称" />
      </div>
      
      <div class="form-group">
        <label for="userName">您的名字</label>
        <input id="userName" v-model="userName" placeholder="请输入您的名字" />
      </div>
      
      <div class="form-group avatar-upload">
        <label for="avatar">您的头像</label>
        <div class="avatar-preview" v-if="avatarPreview">
          <img :src="avatarPreview" alt="头像预览" />
        </div>
        <input id="avatar" type="file" @change="handleAvatarUpload" accept="image/*" />
      </div>
      
      <div class="form-group">
        <label for="notes">读书笔记</label>
        <textarea 
          id="notes" 
          v-model="notes" 
          placeholder="请输入您的读书感想、精彩片段或心得体会..." 
          rows="6"
        ></textarea>
      </div>
      
      <button class="render-button" @click="generateImage">生成分享图片</button>
    </div>
    
    <div class="preview-container" v-if="showPreview">
      <h2>预览效果</h2>
      <div class="note-preview" ref="notePreview">
        <div class="note-header">
          <div class="avatar-container" v-if="avatarPreview">
            <img :src="avatarPreview" alt="用户头像" />
          </div>
          <div class="user-info">
            <h3>{{ userName || '读书爱好者' }}</h3>
            <p class="timestamp">{{ currentDate }}</p>
          </div>
        </div>
        
        <div class="note-content">
          <p class="note-text">"{{ notes || '读书是在别人思想的帮助下,建立起自己的思想。' }}"</p>
          <div class="book-info">
            <p class="book-name">《{{ bookName || '书名' }}》</p>
            <p class="author-name">{{ authorName || '作者' }}</p>
          </div>
        </div>
        
        <div class="note-footer">
          <div class="watermark">由读书笔记分享工具生成</div>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="download-button" @click="downloadImage">下载分享图片</button>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'ReaddingNoteShare',
  data() {
    return {
      bookName: '',
      authorName: '',
      userName: '',
      notes: '',
      avatarFile: null,
      avatarPreview: null,
      showPreview: false,
      currentDate: ''
    }
  },
  mounted() {
    this.updateCurrentDate();
  },
  methods: {
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      this.avatarFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    updateCurrentDate() {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      this.currentDate = now.toLocaleDateString('zh-CN', options);
    },
    generateImage() {
      this.updateCurrentDate();
      this.showPreview = true;
      this.$nextTick(() => {
        // Scroll to preview section
        this.$refs.notePreview.scrollIntoView({ behavior: 'smooth' });
      });
    },
    downloadImage() {
      if (!this.$refs.notePreview) return;
      
      html2canvas(this.$refs.notePreview, {
        useCORS: true,
        scale: 2, // Higher quality
        backgroundColor: null
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `读书笔记-${this.bookName || '分享'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  }
}
</script>

<style scoped>
.reading-note-share {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-container {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  resize: vertical;
}

.avatar-upload {
  display: flex;
  flex-direction: column;
}

.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 10px 0;
  border: 2px solid #ddd;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.render-button, .download-button {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.render-button:hover, .download-button:hover {
  background-color: #40a9ff;
}

.preview-container {
  margin-top: 40px;
}

.note-preview {
  width: 100%;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.note-header {
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.avatar-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.timestamp {
  font-size: 12px;
  color: #999;
  margin: 5px 0 0 0;
}

.note-content {
  padding: 20px;
  background-color: #f9f9f9;
}

.note-text {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
  font-style: italic;
}

.book-info {
  margin-top: 20px;
}

.book-name {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.author-name {
  color: #666;
}

.note-footer {
  padding: 10px 15px;
  background-color: #fff;
  text-align: center;
}

.watermark {
  font-size: 12px;
  color: #999;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .reading-note-share {
    padding: 10px;
  }
}
</style>