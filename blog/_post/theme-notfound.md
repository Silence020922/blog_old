---
title: 爬虫初步
date: 2022-10-22
tag: note
---
## 利用pyton
```
python.exe -m pip install --upgrade pip #更新pip版本
pip install beautifulsoup4 #安装BeautifulSoup
```
### 使用的函数库
```
from urllib.request import urlopen
from urllib.parse import urlparse
from xml.etree.ElementInclude import include
from bs4 import BeautifulSoup 
from urllib.error import URLError
from urllib.error import HTTPError
import re
import time # 由于3.9以上版本random.seed支持格式改变，暂用time库平替。
import random
```
### 示例函数
* 解析函数    
        很多情况下BeautifulSoup()需要被使用,且在需要反复执行解析命令的情况下容易由某些错误或者返回值缺失导致整个程序崩溃,引入try同时定义为函数可方便使用。
```
def bs4_pre(url):
    try:
        html = urlopen(url)
    except HTTPError as e:
        return None
    except URLError as e :
        return  None
    try:
        bs = BeautifulSoup(html.read(),'html.parser')
    except AttributeError as e:
        return None
    return bs
```
* 搜索学院通知专栏信息    
        很多情况下我们需要标题与链接两种信息，在该函数中我将这两种信息综合为字典，最终以key:value \n的形式进行输出。
```
def getmathweb():
    startingPage = ''
    bs = bs4_pre(startingPage)
    mainsite = '{}://{}'.format(urlparse(startingPage).scheme,urlparse(startingPage).netloc)
    allthing = bs.find_all('ul',{'class':'list'})
    linklist = []
    for thing in allthing:
            alllink = re.findall(r"href=\"(.*?)\"",thing.prettify())
            thinglist = thing.get_text().split('\n')	
    thinglist.pop(0)
    for link in alllink:
        if re.match('info',link) == None:
            link = link.replace('&amp;','&')
            linklist.append(link)
        else:
            link = mainsite + '/' + link
            linklist.append(link)
    dictionary = dict(zip(thinglist, linklist))
    for i,j in dictionary.items():
        print(i,j)

```
```
def geteconweb():
    linklist = []
    alink = []
    thinglist = []
    startPage = ''
    bs = bs4_pre(startPage)
    mainweb = '{}://{}'.format(urlparse(startPage).scheme,urlparse(startPage).netloc)
    allthing = bs.find('div',{'id':'list'}).find_all('li')
    for thing in allthing:
        thinglist.append(thing.get_text())
    for thing  in allthing:
        temp = re.findall(r"href=\"(.*?)\"",thing.prettify())
        alink.append(temp)
    for link in alink:
        if re.match('..',link[1]) == None:
            link = link[1].replace('&amp;','&')
            linklist.append(link)
        else:
            link = link[1].replace('..','')
            link = mainweb + link
            linklist.append(link)
    dictionary = dict(zip(thinglist, linklist))
    for i,j in dictionary.items():
        print(i,j)
```
* 获取内链列表    
        很多情况下函数可以很好得执行，但不排除个别网站内链并非以.or/作为开头
```
def getInternalLinks(bs,includeUrl):
    includeUrl = '{}://{}'.format(urlparse(includeUrl).scheme,
        urlparse(includeUrl).netloc)
    internalLinks = []
    for link in bs.find_all('a',href=re.compile('^(/|.*'+includeUrl+')')): 
        if link.attrs['href'] is not None:
            if link.attrs['href'] not in internalLinks:
                if(link.attrs['href'].startswith('/')):
                    internalLinks.append(includeUrl+link.attrs['href'])
                else:
                    internalLinks.append(link.attrs['href'])
    return internalLinks
```
* 获取外链列表
```
def getExternalLinks(bs,excludeUrl):
    externalLinks = []
    for link in bs.find_all('a',href=re.compile('^(http|www)((?!'+excludeUrl+').)*$')):
        if link.attrs['href'] is not None:
            if link.attrs['href'] not in externalLinks:
                externalLinks.append(link.attrs['href'])
    return externalLinks
```
* 输出某个外链    
        在测试阶段发现有个别网站既没有外链又没有内链，于是添加判定使得无外链时自动前往内链进行外链搜索，若无内链则返回主站。
```
def getRandomExternalLink(startingPage):
    bs = bs4_pre(startingPage)
    externalLinks = getExternalLinks(bs,urlparse(startingPage).netloc)
    if len(externalLinks) == 0:
        print('No external links, looking around the site for one')
        domain = '{}://{}'.format(urlparse(startingPage).scheme,urlparse(startingPage).netloc) 
        internalLinks = getInternalLinks(bs,domain)
        if len(internalLinks) == 0:
            print('This is a single website,you could say home page:')
            return domain
        else:
            return getRandomExternalLink(internalLinks[random.randint(0,
            len(internalLinks)-1)])
    else:
        return externalLinks[random.randint(0, len(externalLinks)-1)]
```
* 收集网站上发现得所有链接
```
allExtLinks = set()
allIntLinks = set()
def getAllExternalLinks(siteUrl):
    html = urlopen(siteUrl)
    domain = '{}://{}'.format(urlparse(siteUrl).scheme,urlparse(siteUrl).netloc)
    bs = BeautifulSoup(html, 'html.parser')
    internalLinks = getInternalLinks(bs, domain)
    externalLinks = getExternalLinks(bs, domain)
    for link in externalLinks:
        if link not in allExtLinks:
            allExtLinks.add(link)
            print(link)
    for link in internalLinks:
        if link not in allIntLinks:
            allIntLinks.add(link)
        getAllExternalLinks(link)
```
## 利用RSS
很不幸的是很多大型网站的反爬系统比较完备，对于入门级小白无法获取到自己想要追溯的信息。对于该类网站，RSS订阅能够有效实现信息搜集功能。    
目前利用RSShub/feed43+feeder实现订阅功能。    
* feeder作为常规订阅器，可在firefox上下载feeder插件完成电脑端使用，或下载feeder移动端完成移动端上的订阅。    
* 大多数网站可以通过交互式命令进行RSS订阅，但不排除有些网站不具备该功能键，此时考虑RSS hub利用配置好的文件直接进行订阅。    
* 某些小站可能不会被RSShub收录，可使用feed43生成feed后自行订阅。具体可参考[这里](https://feed43.com/faq.html)
