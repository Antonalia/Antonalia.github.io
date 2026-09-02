## 经验回放（Experience Replay）

 从TD算法的缺点中发展而来：

1、之前的TD算法在一个transition：$(s_t,a_t.r_t.s_{t+1})$用完之后就被抛弃太浪费了

2、之前的TD算法采用的一个transition：$(s_t,a_t.r_t.s_{t+1})$是连续性的，相关性太强，这种相关性是有害的。若两帧之间的变化不大，即$s_t和s_{t+1}$太接近

优点：

1、打破序列的相关性

2、能重复利用数据

---

A transition：$(s_t,a_t.r_t.s_{t+1})$

把n条transition存放在replay buffer（经验回放池）中，当存入新的则把旧的删去，保持在n条。n是一个超参数，大概在$10^5 \sim 10^6$之间，需要根据具体应用调参。

## 优先经验回放

- 不是所有的transition的重要性都是相同的，比如超级玛丽中面对BOSS的transition和安全走路的transition，显然前者更重要更需要训练
- 如果一个transition的TD error $|\delta _t|$更大，那么它将会被给予个更高的权重。因为DQN不熟悉这个场景所以估计的很不准确，所以误差很大，就更需要多加训练
- 采用非均匀抽样代替均匀抽样

![image-20240921122453847](D:\Program Files\hexo-blog\source\images\image-20240921122453847.png)