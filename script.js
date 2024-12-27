// 头像上传处理函数
function handleAvatarUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const preview = document.getElementById('avatar-preview');
            preview.src = e.target.result;
            
            // 添加上传成功的动画效果
            preview.style.transform = 'scale(1.1)';
            setTimeout(() => {
                preview.style.transform = 'scale(1)';
            }, 200);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// 在页面加载完成后执行动画
document.addEventListener('DOMContentLoaded', () => {
    // 初始化滚动动画
    initScrollAnimation();
    
    // 初始化导航栏效果
    initNavigation();
});

// 为所有锚点链接添加平滑滚动效果
function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 初始化滚动动画
function initScrollAnimation() {
    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll('.section, .hobby-item');
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 如果是兴趣爱好卡片，添加图标动画
                if (entry.target.classList.contains('hobby-item')) {
                    const icon = entry.target.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1)';
                        }, 300);
                    }
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // 观察所有元素
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 导航栏高亮效果
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// 实现导航栏的智能显示/隐藏效果
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 在页面顶部时移除滚动效果
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    // 根据滚动方向添加相应的类名
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // 向下滚动时隐藏导航栏
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // 向上滚动时显示导航栏
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 添加鼠标移动视差效果
document.addEventListener('mousemove', (e) => {
    const header = document.querySelector('.header');
    if (header) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        header.style.transform = `
            translate(${mouseX * 20}px, ${mouseY * 20}px)
            perspective(1000px)
            rotateX(${mouseY * 5}deg)
            rotateY(${mouseX * 5}deg)
        `;
    }
}); 