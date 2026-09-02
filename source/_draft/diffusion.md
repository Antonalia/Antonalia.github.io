一张满噪声的图里面可以包含任何一张图片，执行去噪就好比雕塑

时间嵌入（step）和噪音的权重有关，越大表示噪音权重越大，图像中噪音占绝大部分。

noise predictor生成噪声与直接生成带有猫的图片相比更加容易，所以用输入图减去噪声图。

真值是人为通过数据库中选出一张图片，随机采样许多次噪音进行叠加forward process

# Satable Diffusion

1、Text Encoder把文字转换为向量，对文字进行理解

2、Generation Model(diffusion)输入噪声并叠加文字向量，然后生成“中间产物”，是图片被压缩的版本

3套用Decoder把压缩版本还原为原始图片

评价标准

FID越小越好

CLIP越大越好
