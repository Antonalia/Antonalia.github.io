比如$J(\theta)=\mathbb{E}_s[V(S;\theta)]$求期望需要定积分，但可能没有解析解，求不出期望，故也不可能求出梯度，但可以求出随机梯度。随机梯度是对期望的蒙特卡洛近似，得到的算法就是随机梯度上升。

随机梯度上升重复以下几个步骤：

1、$s \leftarrow$ 随机采样

2、在$\theta_{old}$时，计算梯度$g=\frac{\partial Vs;\theta}{\partial \theta}|_{\theta=\theta_{old}}$，是对目标梯度的蒙特卡洛近似

3、随机梯度上升：$\theta_{new} \leftarrow\theta_{old}+\alpha\cdot g$

### 置信域算法

让$\mathcal{N}(\theta_{old})$表示$\theta_{old}$的领域，是一个集合，包含其附近的所有点：
$$
$\mathcal{N}(\theta_{old})=\left  \{ \theta \bigg|\Vert\theta-\theta_{old}\Vert_2 \leq \Delta  \right \}
{}
$$
![image-20240923211351744](D:\Program Files\hexo-blog\source\images\image-20240923211351744.png)

如果存在着这么一个函数$L(\theta|\theta_{old})$，函数的变量是$\theta$，这个函数依赖于$\theta_{old}$，这个$L$在$\theta_{old}$的领域内非常接近目标函数$J(\theta)$，那么领域$\mathcal{N}(\theta_{old})$就被称为置信域。

在这个领域上我们可以用这个$L$代替目标函数$J$，通常$J$是个复杂的函数，$L$是个相对简单的函数，方便训练。但$L$并不是总接近$J$，只在邻域内接近。

![image-20240923212140453](D:\Program Files\hexo-blog\source\images\image-20240923212140453.png)

1、构造L的方法多种多样，可以是二阶泰勒展开，也可以是蒙特卡洛近似，只要让L在置信域内接近J就可以

2、带约束的最大化问题，所以计算量比较大，但表现还是很好

![image-20240923212424157](D:\Program Files\hexo-blog\source\images\image-20240923212424157.png)

![image-20240923212432735](D:\Program Files\hexo-blog\source\images\image-20240923212432735.png)

置信域算法的两个步骤：

1、做近似。在置信域范围内两个函数足够近似

2、最大化。最大化的解不能超出置信域

![image-20240923212540064](D:\Program Files\hexo-blog\source\images\image-20240923212540064.png)

![image-20240923212547895](D:\Program Files\hexo-blog\source\images\image-20240923212547895.png)

可见并不是最优解，故需要不断重复

以上都是优化问题，接下来涉及到强化学习的知识

已知状态价值函数：
$$
\begin{align}
V_{\pi}(s)&=\Sigma_a \pi(a|s; \theta) \cdot Q_{\pi}(s,a)
\\&=\Sigma_a \pi(a|s; \theta_{old})\cdot \frac{\pi(a|s; \theta)}{\pi(a|s; \theta_{old})} \cdot Q_{\pi}(s,a)
\end{align}
$$
将第一项$\pi(a|s; \theta_{old})$看作概率密度函数，求和为1，那么就可以看作对后面的项求期望：
$$
V_{\pi}(s)=\mathbb {E}_{A \sim \pi(\cdot|s; \theta_{old})}\cdot \left[\frac{\pi(A|s; \theta)}{\pi(A|s; \theta_{old})} \cdot Q_{\pi}(s,A) \right]
$$
根据定义，目标函数:
$$
\begin{align}
J(\theta)&=\mathbb E_S[V_{\pi}(s)]
\\&=\mathbb E_S \left[\mathbb {E}_{A \sim \pi(\cdot|s; \theta_{old})}\cdot \left[\frac{\pi(A|s; \theta)}{\pi(A|s; \theta_{old})} \cdot Q_{\pi}(s,A) \right]\right]
\end{align}
$$
接下来进入正题

策略梯度虽然快，但表现不稳定：一方面对超参数的设置比较敏感，学习率的设置对结果影响很大；另一方面是策略梯度算法的随机性大，训练过程中的表现波动非常大。

TRPO表现稳定，对超参数不太敏感，训练曲线不会剧烈波动。同时观测到同样数量的奖励，TRPO能够训练出更好的策略网络

#### 1、近似

在$\theta_{old}$的邻域内得出$J(\theta)$的近似

之前已推导出：
$$
\begin{align}
J(\theta)=\mathbb E_{S,A \sim \pi(\cdot|S; \theta_{old})}\cdot \left[\frac{\pi(A|S; \theta)}{\pi(A|S; \theta_{old})} \cdot Q_{\pi}(S,A) \right]
\end{align}
$$


其中$\theta$是优化变量，$S$是根据环境状态转移函数抽样所得

蒙特卡洛用随机样本来近似期望，即让智能体与环境交互得到一条轨迹，得到观测值：
$$
s_1,a_1,r_1,s_2,a_2,r_2,\cdots,s_n,a_n,r_n
$$
将$S,A$替换为观测得到的$s_i,a_i$，基于$n$个观测的期望就近似成：
$$
\begin{align}
L(\theta|\theta_{old})=\frac{1}{n}\Sigma_{i=1}^n \frac{\pi(a_i|s_i; \theta)}{\pi(a_i|s_i; \theta_{old})} \cdot Q_{\pi}(s_i,a_i) 
\end{align}
$$
然而现在仍不知道$Q_{\pi}$是什么，我们选择蒙特卡洛近似：
$$
Q_{\pi}(s_i,a_i) \approx u_i=r_i+\gamma\cdot r_{i+1}+\gamma^2\cdot r_{i+2}+ \cdots+\gamma^{n-i}\cdot r_n
$$
于是可以得到对目标函数的进一步近似：

![image-20240923220128920](D:\Program Files\hexo-blog\source\images\image-20240923220128920.png)

#### 2、最大化

![image-20240923220500293](D:\Program Files\hexo-blog\source\images\image-20240923220500293.png)

即使第一步近似做的不好，或者最大化做的不好，新的解$\theta_{new}$也不会离旧的解$\theta_{old}$太远，不至于让$\theta$太糟糕。

衡量两者之间的举例的方法：

![image-20240923220441666](D:\Program Files\hexo-blog\source\images\image-20240923220441666.png)

保证一步不会走太远

### 总结

这其实是外层循环

![image-20240923220837398](D:\Program Files\hexo-blog\source\images\image-20240923220837398.png)

1、一整局都没有更新过策略参数

一轮循环玩一局游戏，一轮更新

4、最大化存在着内层循环，是优化问题，数学问题。这一步有两个超参数：梯度下降的步长；置信域的半径$\Delta$。但是对结果影响不大

### 对比

![image-20240923221058547](D:\Program Files\hexo-blog\source\images\image-20240923221058547.png)