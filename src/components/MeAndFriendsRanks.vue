<template>
    <div class="ranks-container">
        <!-- Background section with status bar -->
        <div class="background-section">
            <div class="status-bar">
                <span class="user-name">{{ userName }}</span>
                <span class="stars">🌟 {{ stars }}</span>
                <span class="coins">💰 {{ coins }}</span>
            </div>
        </div>

        <!-- Center avatar section -->
        <div class="avatar-section">
            <button class="circle-button">+</button>
            <img :src="userAvatar" alt="User Avatar" class="user-avatar">
            <button class="circle-button">🎲</button>
        </div>

        <!-- Rankings list -->
        <div class="rankings-list">
            <div v-for="(user, index) in rankings" :key="index" class="rank-item">
                <img :src="user.avatar" alt="User Avatar" class="rank-avatar">
                <span class="rank-name">{{ user.name }}</span>
                <span class="rank-score">{{ user.score }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MeAndFriendsRanks",
    data() {
        return {
            userName: "天天",
            coins: 1000,
            stars: 5,
            userAvatar: "http://101.43.166.211:8081/api/img/kw1gqejpeg",
            rankings: [
                // Mock data
                { name: "User 1", score: 100, avatar: "/path/to/avatar1.jpg" },
                { name: "User 2", score: 90, avatar: "/path/to/avatar2.jpg" },
                // Add more users as needed
            ]
        }
    }
}
</script>

<style scoped>
.ranks-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.background-section {
    height: 30vh;
    background-image: url('http://101.43.166.211:8081/api/img/w40zph3.jpg');
    background-size: cover;
    position: relative;
}

.status-bar {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 15px;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 20px;
}

.avatar-section {
    margin-top: -50px;
    text-align: center;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

.user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.rankings-list {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.rank-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background: #f5f5f5;
    border-radius: 10px;
}

.rank-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.rank-name {
    flex: 1;
}

.rank-score {
    font-weight: bold;
}

.circle-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: #4CAF50;
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.circle-button:hover {
    background-color: #45a049;
}
</style>