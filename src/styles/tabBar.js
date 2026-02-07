const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconContainerActive: {
    backgroundColor: '#EC6A8E',
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  labelActive: {
    color: '#EC6A8E',
    fontWeight: '600',
  },
});
