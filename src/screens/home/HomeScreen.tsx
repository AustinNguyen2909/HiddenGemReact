import React from 'react';
import { Footer, Title, Text, Card } from '../../components';
import './HomeScreen.css';
import CarouselExamples from '../../components/CarouselExamples';

const products = [
  { id: 1, name: 'Sản phẩm A', price: 100000, description: 'Mô tả sản phẩm A' },
  { id: 2, name: 'Sản phẩm B', price: 200000, description: 'Mô tả sản phẩm B' },
  { id: 3, name: 'Sản phẩm C', price: 150000, description: 'Mô tả sản phẩm C' },
  { id: 4, name: 'Sản phẩm D', price: 180000, description: 'Mô tả sản phẩm D' },
  { id: 5, name: 'Sản phẩm E', price: 220000, description: 'Mô tả sản phẩm E' },
  { id: 6, name: 'Sản phẩm F', price: 120000, description: 'Mô tả sản phẩm F' },
];

const HomeScreen: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <Title level="h2" size="lg" align="center" color="primary">
          Danh sách sản phẩm
        </Title>
        
        <ul className="products-list">
          {products.map(product => (
            <li key={product.id}>
              <Card variant="elevated" padding="md" shadow="md" hover>
                <Title level="h3" size="xl" color="accent">
                  {product.name}
                </Title>
                <Text variant="p" size="md" color="secondary" className="product-description">
                  {product.description}
                </Text>
                <Text variant="p" size="lg" weight="semibold" color="primary">
                  Giá: {product.price.toLocaleString()} VND
                </Text>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <CarouselExamples />
      <div className="home-footer">
        <Footer />
      </div>
    </div>
  );
};

export default HomeScreen;
