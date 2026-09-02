## 采用基线（Baseline）的策略梯度

状态价值函数：
$$
\begin{align}
V_\pi(s) &= \mathbb{E}_{A\sim\pi}[Q_\pi(s,A)]
 \\&=\Sigma_a\pi(a|s;\theta) \cdot Q_\pi(s,a)
\end{align}
$$
策略梯度：
$$
\frac{\partial V_\pi(s)}{\partial \theta}=\mathbb{E}_{A \sim\pi}\left[\frac{\partial \ln \pi(A|s; \theta)}{\partial \theta} \cdot Q_\pi(s,A)\right]
$$


基线$b$是不依赖于$A$的任何值：
$$
\begin{align}
\mathbb{E}_{A \sim\pi} \left[ b \cdot \frac{ \partial \ln \pi(A|s; \theta)}{\partial \theta} \right]&=b \cdot \mathbb{E}_{A \sim\pi} \left[\frac{\partial \ln \pi(A|s; \theta)}{\partial \theta} \right]
\\&=b \cdot \Sigma_a \pi (s|a; \theta) \cdot \frac{\partial \ln \pi(a|s; \theta)}{\partial \theta}
\\&=b \cdot \Sigma_a \pi (s|a; \theta) \cdot \left[ \frac{1}{\pi(a|s;\theta)}\cdot \frac{\partial  \pi(a|s; \theta)}{\partial \theta} \right]
\\&=b \cdot\Sigma_a \frac{\partial  \pi(a|s; \theta)}{\partial \theta}
\\&=b \cdot\frac{\Sigma_a\partial  \pi(a|s; \theta)}{\partial \theta}
\\&=b \cdot\frac{\partial1}{\partial \theta}
\\&=0
\end{align}
$$
所以策略梯度可以等价为：
$$
\begin{align}
\frac{\partial V_\pi(s)}{\partial \theta}&=\mathbb{E}_{A \sim\pi}\left[\frac{\partial \ln \pi(A|s; \theta)}{\partial \theta} \cdot \left( Q_\pi(s,A)-b \right)\right]
\\&=\mathbb{E}_{A \sim\pi}[g(A_t)]
\end{align}
$$
可知无论$b$取何值，策略梯度的值保持不变，但是会影响$g(a_t)$的值

采用蒙特卡洛估计时，随机采样$a_t$并计算$g(a_t)$，那么$g(a_t)$就是随机梯度，是策略梯度的无偏估计，是一个具体的采样值。随机策略梯度上升能让策略更好，公式如下：
$$
\theta \leftarrow \theta+\beta \cdot g(a_t)
$$
关于$b$的选值，若$b$很接近$Q_\pi$，那么$g(a_t)$的方差就很小，算法就会收敛地更快。同时可以看出$Q_\pi (s,A)$就是动作价值函数，若奖励都是正的，减去$b$就使得奖励有正有负，能够使得梯度上升的方向正确。由此看出$b=V_\pi(s_t)$是很好的选择，同时和动作$A$无关，又是动作价值函数的期望，两者很接近。

### REINFORCE

随机策略梯度：
$$
g(a_t)=\frac{\partial \ln \pi(A|s; \theta)}{\partial \theta} \cdot \left( Q_\pi(s,A)-V_\pi(s_t) \right)
$$
采用蒙特卡洛近似$Q_\pi(S_t,a_t)\approx u_t$，这就是REINFORCE，
