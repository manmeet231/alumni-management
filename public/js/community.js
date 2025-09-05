

// comuunity--------------------------------------------------------------------------------------------


  // Dummy data for posts
  let posts = [
    {
        id: 1,
        user: {
            name: "Jane Smith",
            headline: "Product Manager at Innovation Inc",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        content: "Excited to announce that our team just launched a new feature that will revolutionize how you interact with our platform! #ProductLaunch #Innovation",
        timestamp: "2 hours ago",
        likes: 42,
        comments: 8
    },
    {
        id: 2,
        user: {
            name: "Michael Johnson",
            headline: "Senior Developer | Web & Mobile Applications",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        content: "Just solved a complex bug that's been haunting our codebase for weeks. The culprit? A single missing semicolon. Sometimes the simplest issues cause the biggest headaches! #Programming #DebuggingNightmares",
        timestamp: "5 hours ago",
        likes: 78,
        comments: 23
    },
    {
        id: 3,
        user: {
            name: "Sarah Williams",
            headline: "UX Designer | Creating User-Centered Experiences",
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        content: "Attended an amazing workshop on accessibility in design today. Remember: accessible design is good design for everyone! #UX #Accessibility #InclusiveDesign",
        timestamp: "1 day ago",
        likes: 134,
        comments: 19
    },
    {
        id: 4,
        user: {
            name: "David Brown",
            headline: "Cloud Architect | AWS Certified",
            image: "https://randomuser.me/api/portraits/men/41.jpg"
        },
        content: "Migrated our entire infrastructure to AWS this week. Loving the scalability and control it provides. #AWS #CloudComputing",
        timestamp: "1 day ago",
        likes: 56,
        comments: 11
    },
    {
        id: 5,
        user: {
            name: "Emily Davis",
            headline: "Marketing Specialist | Digital Strategy Expert",
            image: "https://randomuser.me/api/portraits/women/75.jpg"
        },
        content: "Ran a successful social media campaign that doubled our engagement rates. Strategy + creativity = success! #Marketing #SocialMedia",
        timestamp: "2 days ago",
        likes: 102,
        comments: 17
    },
    {
        id: 6,
        user: {
            name: "Chris Martin",
            headline: "Entrepreneur | Startup Enthusiast",
            image: "https://randomuser.me/api/portraits/men/50.jpg"
        },
        content: "Startups are hard. Growth is slow. Success isn't overnight. But if you love what you're building, the journey is worth it. #Startups #EntrepreneurLife",
        timestamp: "3 days ago",
        likes: 200,
        comments: 45
    },
    {
        id: 7,
        user: {
            name: "Olivia Lee",
            headline: "AI Researcher | Machine Learning Enthusiast",
            image: "https://randomuser.me/api/portraits/women/21.jpg"
        },
        content: "Presented my latest paper on Natural Language Processing at the AI Summit! Honored and excited for future research. #AI #NLP #Research",
        timestamp: "3 days ago",
        likes: 188,
        comments: 36
    },
    {
        id: 8,
        user: {
            name: "Daniel Wilson",
            headline: "Full Stack Developer | JavaScript Evangelist",
            image: "https://randomuser.me/api/portraits/men/23.jpg"
        },
        content: "Finally mastered GraphQL after weeks of practice. Loving how clean and efficient it makes data fetching. #GraphQL #WebDevelopment",
        timestamp: "4 days ago",
        likes: 89,
        comments: 14
    },
    {
        id: 9,
        user: {
            name: "Sophia Turner",
            headline: "Data Scientist | Python & ML Enthusiast",
            image: "https://randomuser.me/api/portraits/women/17.jpg"
        },
        content: "Data is not just numbers; it's stories waiting to be discovered. Dive deep, analyze wisely! #DataScience #MachineLearning",
        timestamp: "5 days ago",
        likes: 153,
        comments: 29
    },
    {
        id: 10,
        user: {
            name: "Ethan Clark",
            headline: "DevOps Engineer | Automation Specialist",
            image: "https://randomuser.me/api/portraits/men/12.jpg"
        },
        content: "Set up a fully automated CI/CD pipeline today. Code faster, deploy safer! #DevOps #Automation",
        timestamp: "6 days ago",
        likes: 76,
        comments: 10
    }
];

// Function to render posts
function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.user.image}" alt="${post.user.name}" class="post-user-img">
                <div class="post-user-info">
                    <div class="post-user-name">${post.user.name}</div>
                    <div class="post-user-headline">${post.user.headline}</div>
                    <div class="post-time">${post.timestamp}</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-interactions">
                <div class="interaction">
                    <i>👍</i> Like (${post.likes})
                </div>
                <div class="interaction">
                    <i>💬</i> Comment (${post.comments})
                </div>
                <div class="interaction">
                    <i>↪️</i> Share
                </div>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Handle post submission
document.getElementById('post-button').addEventListener('click', function() {
    const postText = document.getElementById('post-text').value.trim();
    if (postText) {
        // Create new post object
        const newPost = {
            id: posts.length + 1,
            user: {
                name: "John Doe",
                headline: "Software Engineer at Tech Company",
                image: "/api/placeholder/100/100"
            },
            content: postText,
            timestamp: "Just now",
            likes: 0,
            comments: 0
        };
        
        // Add to beginning of posts array
        posts.unshift(newPost);
        
        // Clear input
        document.getElementById('post-text').value = '';
        
        // Re-render posts
        renderPosts();
    }
});

// Enable/disable post button based on content
document.getElementById('post-text').addEventListener('input', function() {
    const postButton = document.getElementById('post-button');
    if (this.value.trim()) {
        postButton.disabled = false;
    } else {
        postButton.disabled = true;
    }
});

// Initial button state
document.getElementById('post-button').disabled = true;

// Make sure to call renderPosts() when the page loads
document.addEventListener('DOMContentLoaded', function() {
    renderPosts();
});

// Call renderPosts immediately as well (in case DOMContentLoaded already fired)
renderPosts();